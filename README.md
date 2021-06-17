# Investing.com unofficial APIs
[![](https://github.com/davideviolante/investing-com-api/workflows/Node.js%20CI/badge.svg)](https://github.com/DavideViolante/investing-com-api/actions?query=workflow%3A"Node.js+CI") [![Coverage Status](https://coveralls.io/repos/github/DavideViolante/investing-com-api/badge.svg?branch=master)](https://coveralls.io/github/DavideViolante/investing-com-api?branch=master)  [![Maintainability](https://api.codeclimate.com/v1/badges/ce48adbd97ff85557918/maintainability)](https://codeclimate.com/github/DavideViolante/investing-com-api/maintainability) [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)

Unofficial APIs for Investing.com website.

### Install
`npm i investing-com-api`

### Example
```js
const { investing } = require('investing-com-api')

async function main () {
  try {
    const response = await investing('currencies/eur-usd', 3600, 24, '1-day') //EURxUSD quotes of last 24h (input, interval, candle_count, period)
  } catch (err) {
    console.error(err)
  }
}
```

### Response
```js
[
  { date: 1623812400000, value: 1.1093 },
  { date: 1623816000000, value: 1.1054 },
  { date: 1623819600000, value: 1.1025 },
  { date: 1623823200000, value: 1.1018 },
  ...
]
```


### Available inputs
- [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js)
- interval (in milliseconds quotes interval)
- candle_count (maximum number of results)
- period (n-day or n-month or n-year)

### Run tests
- `npm test`

### Run lint
- `npm run lint`

### Author
- [Davide Violante](https://github.com/DavideViolante/)
