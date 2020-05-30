# Investing.com unofficial APIs
![Node.js CI](https://github.com/DavideViolante/investing-com-api/workflows/Node.js%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/ce48adbd97ff85557918/maintainability)](https://codeclimate.com/github/DavideViolante/investing-com-api/maintainability) [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)

Unofficial APIs for Investing.com website.

### Install
`npm i investing-com-api`

### Example
```js
const { investing } = require('investing-com-api')

async function main () {
  const response = await investing('currencies/eur-usd')
  // response = [ { date: Timestamp, value: Number }, {...}, ... ]
}
```

### Available inputs
- [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js)

### Run tests
- `npm test`

### Run lint
- `npm run lint`

### Author
- [Davide Violante](https://github.com/DavideViolante/)
