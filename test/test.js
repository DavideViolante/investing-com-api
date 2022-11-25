/* eslint-disable max-len */
const puppeteer = require('puppeteer');
const assert = require('assert');
const { investing } = require('../index');
const { getJsonContent, mapResponse } = require('../functions');

const mockData = [
  [1587340800000, 230.7, 0, 0],
  [1587427200000, 259.4, 0, 0],
  [1587513600000, 246.2, 0, 0],
  [1587945600000, 218, 0, 0],
];
let browser;
let page;

/**
 * Initialize Puppeteer for tests
 */
async function initPuppeteer() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36');
}

describe('Tests for Investing.com unofficial APIs', () => {
  beforeAll(async () => {
    await initPuppeteer();
  });

  afterAll(() => {
    browser.close();
  });

  it('should map an array of arrays to array of objects', () => {
    const mappedResponse = mapResponse(mockData);
    assert.strictEqual(mockData[0][0], mappedResponse[0].date);
    assert.strictEqual(mockData[0][1], mappedResponse[0].value);
    assert.strictEqual(mockData[1][0], mappedResponse[1].date);
    assert.strictEqual(mockData[1][1], mappedResponse[1].value);
  });

  it('should get json content from page', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1M&interval=P1D&pointscount=120`);
    const { data } = await getJsonContent(page);
    assert.ok(data);
  });

  it('should return undefined and print error if no input is given', async () => {
    const response = await investing();
    assert.strictEqual(response, undefined);
  });

  it('should return undefined and print error if input is invalid', async () => {
    const response = await investing('currencies/invalid');
    assert.strictEqual(response, undefined);
  });

  it('should return error with invalid period', async () => {
    const response = await investing('currencies/eur-usd', '1M');
    assert.strictEqual(response, undefined);
  });

  it('should return error with invalid interval', async () => {
    const response = await investing('currencies/eur-usd', 'P1M', '15M');
    assert.strictEqual(response, undefined);
  });

  it('should return error with invalid pointscount', async () => {
    const response = await investing('currencies/eur-usd', 'P1M', 'P1D', 20);
    assert.strictEqual(response, undefined);
  });

  it('should get data from investing.com APIs', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1M&interval=P1D&pointscount=120`);
    const { data } = await getJsonContent(page);
    assert.ok(Array.isArray(data));
    assert.ok(data.length);
    assert.ok(Array.isArray(data[0]));
    assert.strictEqual(data[0].length, 7);
  });

  it('should return data from investing.com with default params', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1M&interval=P1D&pointscount=120`);
    const { data } = await getJsonContent(page);
    assert.ok(Array.isArray(data));
    assert.ok(data.length);
    assert.ok(Array.isArray(data[0]));
    assert.strictEqual(data[0].length, 7);
    assert.ok(data.length >= 20 && data.length <= 24);
  });

  it('should return data from investing.com with custom period', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1D&interval=P1D&pointscount=120`);
    const { data } = await getJsonContent(page);
    assert.ok(Array.isArray(data));
    assert.ok(data.length);
    assert.ok(Array.isArray(data[0]));
    assert.strictEqual(data[0].length, 7);
    assert.strictEqual(data.length, 1);
  });

  it('should return data from investing.com with custom interval', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1M&interval=P1W&pointscount=120`);
    const { data } = await getJsonContent(page);
    assert.ok(Array.isArray(data));
    assert.ok(data.length);
    assert.ok(Array.isArray(data[0]));
    assert.strictEqual(data[0].length, 7);
    assert.ok(data.length >= 5 && data.length <= 7);
  });

  it('should return data from investing.com with custom pointscount', async () => {
    await page.goto(`https://api.investing.com/api/financialdata/1/historical/chart?period=P1M&interval=P1D&pointscount=60`);
    const { data } = await getJsonContent(page);
    assert.ok(Array.isArray(data));
    assert.ok(data.length);
    assert.ok(Array.isArray(data[0]));
    assert.strictEqual(data[0].length, 7);
    assert.ok(data.length >= 20 && data.length <= 24);
  });
});
