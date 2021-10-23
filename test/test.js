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
  it('should map an array of arrays to array of objects', () => {
    const mappedResponse = mapResponse(mockData);
    assert.strictEqual(mockData[0][0], mappedResponse[0].date);
    assert.strictEqual(mockData[0][1], mappedResponse[0].value);
    assert.strictEqual(mockData[1][0], mappedResponse[1].date);
    assert.strictEqual(mockData[1][1], mappedResponse[1].value);
  });

  it('should return data from investing.com with just input parameter', async () => {
    const response = await investing('currencies/eur-usd');
    assert.ok(response);
    assert.ok(response.length);
    assert.ok(response.length === 24);
  });

  it('should return data from investing.com with default interval', async () => {
    const interval = 3600;
    const response = await investing('currencies/eur-usd', interval);
    const diff = response[1].date - response[0].date;
    assert.ok(diff === (interval * 1000));
    assert.ok(response.length === 24);
  });

  it('should return data from investing.com with half default interval', async () => {
    const interval = 1800;
    const response = await investing('currencies/eur-usd', interval);
    const diff = response[1].date - response[0].date;
    assert.ok(diff === (interval * 1000));
    assert.ok(response.length === 48);
  });

  it('should return data from investing.com with 1/4 default interval', async () => {
    const interval = 900;
    const response = await investing('currencies/eur-usd', interval);
    const diff = response[1].date - response[0].date;
    assert.ok(diff === (interval * 1000));
    assert.ok(response.length === 96);
  });

  it('should return error with invalid interval', async () => {
    const interval = 1200;
    const response = await investing('currencies/eur-usd', interval);
    assert.strictEqual(response, undefined);
  });

  // eslint-disable-next-line max-len
  it('should return data from investing.com with half default interval and max 24 results in a 2-hour period', async () => {
    const interval = 1800;
    const response = await investing('currencies/eur-usd', interval, 24, '2-hour');
    const diff1 = response[1].date - response[0].date;
    const diff2 = response[1].date - response[response.length - 1].date;
    assert.ok(diff1 === (interval * 1000));
    assert.ok(diff2 <= (interval * 4 * 1000));
    assert.ok(response.length === 24);
  });

  it('should return undefined if no input is given', async () => {
    const response = await investing();
    assert.strictEqual(response, undefined);
  });

  it('should return undefined if the endpoint is invalid', async () => {
    const response = await investing('currencies/invalid');
    assert.strictEqual(response, undefined);
  });
});
