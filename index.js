const puppeteer = require('puppeteer');
const { mapping } = require('./mapping');
const { getJsonContent, mapResponse } = require('./functions');

const validPeriod = ['P1D', 'P1W', 'P1M', 'P3M', 'P6M', 'P1Y', 'P5Y', 'MAX'];
const validInterval = ['PT1M', 'PT5M', 'PT15M', 'PT30M', 'PT1H', 'PT5H', 'P1D', 'P1W', 'P1M'];
const validPointscount = [60, 70, 120];

/**
 * Check if params are valid
 * @param {String} input input
 * @param {String} period period
 * @param {String} interval interval
 * @param {Number} pointscount pointscount
 */
function checkParams(input, period, interval, pointscount) {
  if (!input) {
    throw Error('Parameter input is required');
  }
  if (!validPeriod.includes(period)) {
    throw Error('Invalid period parameter. Valid values are: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX');
  }
  if (!validInterval.includes(interval)) {
    throw Error('Invalid interval parameter. Valid values are: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M');
  }
  if (!validPointscount.includes(pointscount)) {
    throw Error('Invalid pointscount parameter. Valid values are: 60, 70, 120');
  }
}

/**
 * Call Investing website
 * @param {string} pairId Input string, see mapping.js keys, or provide a valid investing.com pairId
 * @param {string} period Period of time, window size.
 *                        Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} interval Interval between results.
 *                          Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} pointscount Number of results returned. Valid values: 60, 70, 120
 * @param {*} pptrLaunchOptions Puppeteer launch options, see https://pptr.dev/api/puppeteer.launchoptions
 * @return {Promise<Array>} An array of arrays with date (timestamp) and values (number) properties
 */
async function callInvesting(pairId, period, interval, pointscount, pptrLaunchOptions) {
  const browser = await puppeteer.launch(pptrLaunchOptions);
  const page = await browser.newPage();
  // eslint-disable-next-line max-len
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36');
  // eslint-disable-next-line max-len
  await page.goto(`https://api.investing.com/api/financialdata/${pairId}/historical/chart?period=${period}&interval=${interval}&pointscount=${pointscount}`);
  const jsonContent = await getJsonContent(page);
  await browser.close();
  return jsonContent.data;
}

/**
 * Investing
 * @param {string} input Input string, see mapping.js keys, or provide a valid investing.com pairId
 * @param {string} [period] Period of time, window size. Default P1M (1 month)
 *                        Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} [interval] Interval between results. Default P1D (1 day)
 *                          Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} [pointscount] Number of results returned, but depends on period and interval too.
 *                             Valid values: 60, 70, 120
 * @param {*} [pptrLaunchOptions] Puppeteer launch options, see https://pptr.dev/api/puppeteer.launchoptions
 * @return {Promise<Array>} An array of objects with date (timestamp), value (number) and other (number) properties
 */
async function investing(input, period = 'P1M', interval = 'P1D', pointscount = 120, pptrLaunchOptions) {
  try {
    checkParams(input, period, interval, pointscount);
    const pairId = mapping[input]?.pairId || input;
    const resInvesting = await callInvesting(pairId, period, interval, pointscount, pptrLaunchOptions);
    const results = mapResponse(resInvesting);
    if (!results.length) {
      throw Error('Wrong input or pairId');
    }
    return results;
  } catch (err) {
    console.error(err.message);
    if (err.response?.data?.['@errors']?.[0]) {
      console.error(err.response.data['@errors'][0]);
    }
  }
}

// investing('1').then(console.log);

exports.investing = investing;
