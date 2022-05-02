const assert = require('assert');
const { investing } = require('../index');
const { mapResponse } = require('../functions');

const mockData = [
  [1587340800000, 230.7, 0, 0],
  [1587427200000, 259.4, 0, 0],
  [1587513600000, 246.2, 0, 0],
  [1587945600000, 218, 0, 0],
];

describe('Tests for Investing.com unofficial APIs', () => {
  it('should return undefined and print error if no input is given', async () => {
    const response = await investing();
    assert.strictEqual(response, undefined);
  });

  it('should return undefined and print error if input is invalid', async () => {
    const response = await investing('currencies/invalid');
    assert.strictEqual(response, undefined);
  });

  it('should map an array of arrays to array of objects', () => {
    const mappedResponse = mapResponse(mockData);
    assert.strictEqual(mockData[0][0], mappedResponse[0].date);
    assert.strictEqual(mockData[0][1], mappedResponse[0].value);
    assert.strictEqual(mockData[1][0], mappedResponse[1].date);
    assert.strictEqual(mockData[1][1], mappedResponse[1].value);
  });

  it('should return data from investing.com with default params', async () => {
    const response = await investing('currencies/eur-usd');
    const len = response.length;
    assert.ok(response);
    assert.ok(len);
    assert.ok(len >= 20 && len <= 23);
  });

  it('should return error with invalid period', async () => {
    const response = await investing('currencies/eur-usd', '1M');
    assert.strictEqual(response, undefined);
  });

  it('should return data from investing.com with custom period (1D, 1W)', async () => {
    const dayPeriods = ['P1D', 'P1W'];
    for (const period of dayPeriods) {
      const response = await investing('currencies/eur-usd', period);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return data from investing.com with custom period (1M, 3M, 6M)', async () => {
    const monthPeriods = ['P1M', 'P3M', 'P6M'];
    for (const period of monthPeriods) {
      const response = await investing('currencies/eur-usd', period);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return data from investing.com with custom period (1Y, 5Y, MAX)', async () => {
    const yearPeriods = ['P1Y', 'P5Y', 'MAX'];
    for (const period of yearPeriods) {
      const response = await investing('currencies/eur-usd', period);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return error with invalid interval', async () => {
    const response = await investing('currencies/eur-usd', 'P1M', '15M');
    assert.strictEqual(response, undefined);
  });

  it('should return data from investing.com with custom interval (1M, 5M, 15M, 30M)', async () => {
    const minuteIntervals = ['PT1M', 'PT5M', 'PT15M', 'PT30M'];
    for (const interval of minuteIntervals) {
      const response = await investing('currencies/eur-usd', 'P1M', interval);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return data from investing.com with custom interval (1H, 5H)', async () => {
    const minuteIntervals = ['PT1H', 'PT5H'];
    for (const interval of minuteIntervals) {
      const response = await investing('currencies/eur-usd', 'P1M', interval);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return data from investing.com with custom interval (1D, 1W, 1M)', async () => {
    const minuteIntervals = ['P1D', 'P1W', 'P1M'];
    for (const interval of minuteIntervals) {
      const response = await investing('currencies/eur-usd', 'P1M', interval);
      const len = response.length;
      assert.ok(response);
      assert.ok(len);
    }
  });

  it('should return data from investing.com with custom period and interval', async () => {
    const response = await investing('currencies/eur-usd', 'P3M', 'PT1H');
    const len = response.length;
    assert.ok(response);
    assert.ok(len);
  });

  it('should return error with invalid pointscount', async () => {
    const response = await investing('currencies/eur-usd', 'P1M', 'P1D', 20);
    assert.strictEqual(response, undefined);
  });

  it('should return data from investing.com with custom pointscount', async () => {
    const response = await investing('currencies/eur-usd', 'P1M', 'P1D', 60);
    const len = response.length;
    assert.ok(response);
    assert.ok(len);
  });
});
