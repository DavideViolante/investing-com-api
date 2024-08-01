/**
 * Map the Investing array response
 * @param {Array} array Array of data returned from Investing website
 * @return {Array} An array of objects with date and value properties
 */
function mapResponse(array = []) {
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
 * @return {Object} JSON response from Investing, with data property containing an array of arrays
 */
async function getJsonContent(page) {
  // If there is this element, the page cannot be loaded due to CloudFlare protection
  // Element: <body class="no-js">
  // eslint-disable-next-line no-undef
  const bodyClass = await page.evaluate(() => document.querySelector('body').getAttribute('class'));
  if (bodyClass === 'no-js') {
    throw new Error(`Error: couldn't bypass CloudFlare protection`);
  }
  // eslint-disable-next-line no-undef
  const content = await page.evaluate(() => document.querySelector('body').textContent);
  return JSON.parse(content);
}

module.exports = {
  mapResponse,
  getJsonContent,
};
