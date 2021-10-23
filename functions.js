/**
 * Map the Investing array response
 * @param {Array} array Array of data returned from Investing website
 * @return {Array} An array of objects with date and value properties
 */
function mapResponse(array) {
  return array.map((item) => ({
    date: item[0],
    value: item[1],
  }));
}

module.exports = {
  mapResponse,
};
