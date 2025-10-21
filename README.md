# exchangerateapi-js

A minimal JavaScript wrapper for exchangerateapi.net providing convenient access to the two endpoints.

- Website: [exchangerateapi.com](https://exchangerateapi.com)

## Installation

```bash
npm install
```

## Usage

```javascript
const { ExchangeRateApiClient } = require('exchangerateapi-js');
```

Or directly from `src` in this repo for local testing:

```javascript
const { ExchangeRateApiClient } = require('./src/index');
```

### Instantiate

```javascript
const client = new ExchangeRateApiClient({ apiKey: process.env.EXCHANGERATEAPI_KEY });
```

### Endpoints

- Latest: retrieves the latest rates for a base currency, optional symbols filter.
- Historical: retrieves historical rates for a date, base currency, optional symbols filter.

### Examples

Run with an API key in your environment:

```bash
EXCHANGERATEAPI_KEY=your_api_key node examples/latest.js
EXCHANGERATEAPI_KEY=your_api_key node examples/historical.js
```

#### Latest

```javascript
const latestUsd = await client.getLatest({ base: 'USD' });
const latestEurSubset = await client.getLatest({ base: 'EUR', symbols: ['USD', 'GBP', 'JPY'] });
```

#### Historical

```javascript
const histUsd = await client.getHistorical({ date: '2024-01-02', base: 'USD' });
const histEurSubset = await client.getHistorical({ date: '2024-01-02', base: 'EUR', symbols: ['USD', 'GBP', 'JPY'] });
```

## License

MIT
