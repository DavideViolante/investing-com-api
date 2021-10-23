const axios = require('axios');
const { mapping } = require('./mapping');
const { mapResponse } = require('./functions');

/**
 * Call Investing.com APIs
 * @param {string} pairId The ID of the resource to get from Investing.com
 * @param {number} interval Interval between results in seconds,
 *                          only some values are accepted such as 900, 1800, 3600, 18000, etc
 * @param {number} candleCount Number of total results, seems it must be >10,
 *                             it depends on interval and period too
 * @param {string} period n-hour, n-day, n-month or n-year string where n is a number
 * @return {Object} Object with the following properties: _comment, candles, events, attr, html
 */
function callInvesting(pairId, interval, candleCount, period) {
  return axios({
    method: 'GET',
    url: 'https://www.investing.com/common/modules/js_instrument_chart/api/data.php',
    params: {
      pair_id: pairId,
      pair_interval: interval,
      chart_type: 'area', // 'area', 'candlestick'
      candle_count: candleCount,
      volume_series: 'no',
      events: 'no',
      period: period,
    },
    headers: {
      'Referer': 'https://www.investing.com/',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
}

/**
 * Call Investing
 * @param {string} input Input string, see mapping.js
 * @param {number} interval Interval between results in seconds,
 *                          only some values are accepted such as 900, 1800, 3600, 18000, etc
 * @param {number} candleCount Number of total results, seems it must be >10,
 *                             it depends on interval and period too
 * @param {string} period n-hour, n-day, n-month or n-year string where n is a number
 * @return {Array} An array of object with date and value properties
 */
async function investing(input, interval = 3600, candleCount = 24, period = '1-day') {
  try {
    if (!input) {
      throw Error('Parameter input is required');
    }
    const endpoint = mapping[input];
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`);
    }
    const { data } = await callInvesting(endpoint.pairId, interval, candleCount, period);
    if (!data.candles) {
      throw Error('No data.candles found, please check your params');
    }
    const results = mapResponse(data.candles);
    return results;
  } catch (err) {
    console.error(err.message);
  }
}

exports.investing = investing;
