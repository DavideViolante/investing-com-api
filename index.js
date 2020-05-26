const axios = require('axios')
const { mapResponse } = require('./functions')

async function investing (pairId) {
  try {
    if (!pairId) {
      throw Error('No pairId input provided')
    }
    const response = await axios({
      method: 'GET',
      url: 'https://www.investing.com/common/modules/js_instrument_chart/api/data.php',
      params: {
        pair_id: pairId,
        pair_interval: '86400',
        chart_type: 'area', // 'area', 'candlestick'
        candle_count: '120',
        volume_series: 'yes',
        events: 'yes',
        period: ''
      },
      headers: {
        'Referer': 'https://www.investing.com/',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    if (!response.data.candles) {
      throw Error('No response')
    }
    const results = mapResponse(response.data.candles)
    return results
  } catch (err) {
    console.log(err.message)
  }
}

exports.investing = investing
