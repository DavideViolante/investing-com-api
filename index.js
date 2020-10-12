const axios = require('axios')
const { mapping } = require('./mapping')
const { mapResponse } = require('./functions')

function callInvesting (pairId) {
  return axios({
    method: 'GET',
    url: 'https://www.investing.com/common/modules/js_instrument_chart/api/data.php',
    params: {
      pair_id: pairId,
      pair_interval: '86400', // 1 day
      chart_type: 'area', // 'area', 'candlestick'
      candle_count: '90', // days
      volume_series: 'yes',
      events: 'yes',
      period: '1-year'
    },
    headers: {
      'Referer': 'https://www.investing.com/',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

async function investing (input) {
  try {
    if (!input) {
      throw Error('Parameter input is required')
    }
    const endpoint = mapping[input]
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`)
    }
    const response = await callInvesting(endpoint.pairId)
    if (!response.data.candles) {
      throw Error('No response.data.candles found')
    }
    const results = mapResponse(response.data.candles)
    // console.log(results)
    return results
  } catch (err) {
    console.log(err.message)
  }
}

// investing('equities/netflix,-inc.')

exports.investing = investing
