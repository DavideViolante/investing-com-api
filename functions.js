/**
 * Map the Investing array response
 * @param {Array} array Array of data returned from Investing website
 * @return {Array} An array of objects with date and value properties
 */
function mapResponse(array) {
  return array.map((item) => ({
    date: item[0], // date
    value: item[1], // open
    price_open: item[1],
    price_high: item[2],
    price_low: item[3],
    price_close: item[4],
  }));
}

/**
 * Get JSON response from Investing APIs
 * @param {*} page puppeteer page
 * @return {Object} JSON response from Investing
 */
async function getJsonContent(page) {
  // eslint-disable-next-line no-undef
  const content = await page.evaluate(() => document.querySelector('body').textContent);
  return JSON.parse(content);
}

module.exports = {
  mapResponse,
  getJsonContent,
};
