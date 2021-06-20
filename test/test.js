const assert = require('assert')
const { investing } = require('../index')
const { mapResponse } = require('../functions')

const mockData = [
  [1587340800000, 230.7, 0, 0],
  [1587427200000, 259.4, 0, 0],
  [1587513600000, 246.2, 0, 0],
  [1587945600000, 218, 0, 0]
]

describe('Tests for Investing.com unofficial APIs', () => {
  it('should map an array of arrays to array of objects', () => {
    const mappedResponse = mapResponse(mockData)
    assert.strictEqual(mockData[0][0], mappedResponse[0].date)
    assert.strictEqual(mockData[0][1], mappedResponse[0].value)
    assert.strictEqual(mockData[1][0], mappedResponse[1].date)
    assert.strictEqual(mockData[1][1], mappedResponse[1].value)
  })

  it('should return data from investing.com with just input parameter', async () => {
    const response = await investing('currencies/eur-usd')
    assert.ok(response)
    assert.ok(response.length)
  })

  it('shouw return data from investing.com with an 5min (1800s) interval between them', async () => {
    const response = await investing('currencies/eur-usd', 1800)
    const diff = response[1].date - response[0].date
    assert.ok(diff === (1800 * 1000))
  })

  it('should return data from investing.com with an 5min (1800s) interval between them and a maximum of 24 results in a 2-hour max time window', async () => {
    const response = await investing('currencies/eur-usd', 1800, 24, '2-hour')
    assert.ok((response[1].date - response[response.length - 1].date) <= 7200000)
  })

  it('should return data from investing.com with an 5min (1800s) interval between them and a maximum of 24 results in a 2-hour time window', async () => {
    const response = await investing('currencies/eur-usd', 1800, 24, '2-hour')
    const diff = response[1].date - response[0].date
    assert.ok(diff === (1800 * 1000))
    assert.ok(response.length === 24)
  })

  it('should return undefined if no input is given', async () => {
    const response = await investing()
    assert.strictEqual(response, undefined)
  })

  it('should return undefined if the endpoint is invalid', async () => {
    const response = await investing('currencies/invalid')
    assert.strictEqual(response, undefined)
  })
})
