'use strict';

const { ExchangeRateApiClient } = require('../src/index');

const apiKey = process.env.EXCHANGERATEAPI_KEY || 'YOUR_API_KEY';
const client = new ExchangeRateApiClient({ apiKey });

(async () => {
  try {
    // Example A: Historical for a date with base only
    const histUsd = await client.getHistorical({ date: '2024-01-02', base: 'USD' });
    console.log('Historical 2024-01-02 (base=USD):', histUsd && histUsd.rates ? Object.keys(histUsd.rates).slice(0,5) : histUsd);

    // Example B: Historical for a date with base and symbols filter
    const histEurSubset = await client.getHistorical({ date: '2024-01-02', base: 'EUR', symbols: ['USD', 'GBP', 'JPY'] });
    console.log('Historical 2024-01-02 (base=EUR, symbols=USD,GBP,JPY):', histEurSubset);
  } catch (err) {
    console.error('Error running historical examples:', err.message);
  }
})();
