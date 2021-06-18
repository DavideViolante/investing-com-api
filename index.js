const axios = require('axios')
const { mapping } = require('./mapping')
const { mapResponse } = require('./functions')

function callInvesting (pairId, interval, candleCount, period) {
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
      period: period
    },
    headers: {
      'Referer': 'https://www.investing.com/',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

async function investing (input, interval = 3600, candleCount = 24, period = '1-day') {
  try {
    if (!input) {
      throw Error('Parameter input is required')
    }
    const endpoint = mapping[input]
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`)
    }
    const response = await callInvesting(endpoint.pairId, interval, candleCount, period)
    if (!response.data.candles) {
      throw Error('No response.data.candles found')
    }
    const results = mapResponse(response.data.candles)
    return results
  } catch (err) {
    console.error(err.message)
  }
}

exports.investing = investing
