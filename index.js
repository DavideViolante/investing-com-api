const axios = require('axios');
const { mapping } = require('./mapping');
const { mapResponse } = require('./functions');

/**
 * Call Investing
 * @param {string} pairId Input string, see mapping.js keys
 * @param {string} period Period of time, window size.
 *                        Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} interval Interval between results.
 *                          Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} pointscount Number of results returned. Valid values: 60, 70, 120
 * @return {Array} An array of objects with date (timestamp) and value (number) properties
 */
function callInvesting(pairId, period, interval, pointscount) {
  return axios({
    method: 'GET',
    url: `https://api.investing.com/api/financialdata/${pairId}/historical/chart/`,
    params: {
      period,
      interval,
      pointscount,
    },
  });
}

/**
 * Call Investing
 * @param {string} input Input string, see mapping.js keys
 * @param {string} period Period of time, window size. Default P1M (1 month)
 *                        Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} interval Interval between results. Default P1D (1 day)
 *                          Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} pointscount Number of results returned, but depends on period and interval too.
 *                             Valid values: 60, 70, 120
 * @return {Array} An array of objects with date (timestamp) and value (number) properties
 */
async function investing(input, period = 'P1M', interval = 'P1D', pointscount = 120) {
  try {
    if (!input) {
      throw Error('Parameter input is required');
    }
    const endpoint = mapping[input];
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`);
    }
    const { data } = await callInvesting(endpoint.pairId, period, interval, pointscount);
    /* if (!data.data) {
      throw Error('No data.data found, please check your params');
    } */
    const results = mapResponse(data.data);
    return results;
  } catch (err) {
    console.error(err.message);
    if (err.response?.data?.['@errors']?.[0]) {
      console.error(err.response.data['@errors'][0]);
    }
  }
}

exports.investing = investing;
