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
    const response1 = await investing('currencies/eur-usd');
    const response2 = await investing('currencies/eur-usd', 'P1M', 'P1D'); // With optional params
  } catch (err) {
    console.error(err);
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


### Inputs
Only input is required, other params are optional.
- **input** _String_: input string, see [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js) keys. (Required)
- **period** _String_: Period of time, window size. Default P1M (1 month). Valid values: P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX.
- **interval** _Number_: Interval between results. Default P1D (1 day). Valid values: PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M.
- **pointscount** _Number_: number of total results. Valid values seems to be 60, 70 or 120.

### Run tests
`npm test`

### Run lint
`npm run lint`

### Contribute
PRs are welcome to add more elements to the [mapping.js](https://github.com/DavideViolante/investing-com-api/blob/master/mapping.js) file.

### Author
- [Davide Violante](https://github.com/DavideViolante/)
