function mapResponse (array) {
  return array.map(item => ({
    date: item[0],
    value: item[1]
  }))
}

module.exports = {
  mapResponse
}
