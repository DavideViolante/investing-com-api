# Investing.com unofficial APIs ![Node.js CI](https://github.com/DavideViolante/investing-com-api/workflows/Node.js%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/ce48adbd97ff85557918/maintainability)](https://codeclimate.com/github/DavideViolante/investing-com-api/maintainability) [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)

Unofficial APIs wrapper for Investing.com website.

### Install
`npm i investing-com-api`

### Example
```js
const { investing } = require('investing-com-api')
const response = investing('<pairId>') // pairId identifies the data to get, see below
// response = [ { date: Timestamp, value: Number }, {...}, ... ]
```

### How to find pairId
1. Go to investing.com page where there is the chart of your interest
2. View the page source and find `pairId:`
3. Use the pairId as a String to call the APIs


### Run tests
- `npm test`

### Run lint
- `npm run lint`

### Author
- [Davide Violante](https://github.com/DavideViolante/)
