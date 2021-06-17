const axios = require('axios')
const { mapping } = require('./mapping')
const { mapResponse } = require('./functions')

function callInvesting (pairId, interval, candle_count, period) {
  return axios({
    method: 'GET',
    url: 'https://www.investing.com/common/modules/js_instrument_chart/api/data.php',
    params: {
      pair_id: pairId,
      pair_interval: interval,
      chart_type: 'area', // 'area', 'candlestick'
      candle_count: candle_count, 
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

async function investing (input, interval, candle_count, period) {
  try {
    if (!input) {
      throw Error('Parameter input is required')
    }
    if (!interval){
      interval = 3600 //1h default interval
    }
    if (!candle_count) {
      candle_count = 24 //1 day default to 1h interval
    }
    if (!period){
      period = '1-day' //1 Day default period
    }
    const endpoint = mapping[input]
    if (!endpoint) {
      throw Error(`No mapping found for ${input}, check mapping.js`)
    }
    const response = await callInvesting(endpoint.pairId, interval, candle_count, period)
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
