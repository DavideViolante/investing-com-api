# Investing.com Unofficial APIs
[![](https://github.com/davideviolante/investing-com-api/workflows/Node.js%20CI/badge.svg)](https://github.com/DavideViolante/investing-com-api/actions?query=workflow%3A"Node.js+CI") [![Coverage Status](https://coveralls.io/repos/github/DavideViolante/investing-com-api/badge.svg?branch=master)](https://coveralls.io/github/DavideViolante/investing-com-api?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/ce48adbd97ff85557918/maintainability)](https://codeclimate.com/github/DavideViolante/investing-com-api/maintainability) ![npm](https://img.shields.io/npm/dm/investing-com-api)  [![Donate](https://img.shields.io/badge/paypal-donate-179BD7.svg)](https://www.paypal.me/dviolante)

[![NPM](https://nodei.co/npm/investing-com-api.png)](https://nodei.co/npm/investing-com-api/)

Unofficial APIs for Investing.com website.

### Install
`npm i investing-com-api`

### Example
```js
const { investing } = require('investing-com-api');

async function main() {
  try {
    const response1 = await investing('currencies/eur-usd'); // Providing a valid mapping.js key
    const response2 = await investing('currencies/eur-usd', 'P1M', 'P1D'); // With optional params
    const response3 = await investing('1'); // Providing the pairId directly, even if not present in mapping.js
  } catch (err) {
    console.error(err);
  }
}
```

### Response
```js
[
  {
    date: 1659398400000,
    value: 1.0264,
    price_open: 1.0264,
    price_high: 1.0294,
    price_low: 1.0155,
    price_close: 1.0157
  },
  {
    date: 1659484800000,
    value: 1.0158,
    price_open: 1.0158,
    price_high: 1.0209,
    price_low: 1.0126,
    price_close: 1.0136
  },
  ...
]
```


### Inputs
Only input is required, other params are optional.
- **input** _String_: input string, see [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js) keys, or provide a valid investing.com pairId. (Required)
- **period** _String_: Period of time, window size. Default P1M (1 month). Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX.
- **interval** _Number_: Interval between results. Default P1D (1 day). Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M.
- **pointscount** _Number_: number of total results. Valid values seems to be 60, 70 or 120.
- **pptrLaunchOptions** _Any_: Puppeteer launch options, see [official website](https://pptr.dev/api/puppeteer.launchoptions).

### Run tests
`npm test`

### Run lint
`npm run lint`

### Contribute
PRs are welcome to add more elements to the [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js) file.

### Author
- [Davide Violante](https://github.com/DavideViolante/)
