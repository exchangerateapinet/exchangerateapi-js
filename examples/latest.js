'use strict';

const { ExchangeRateApiClient } = require('../src/index');

const apiKey = process.env.EXCHANGERATEAPI_KEY || 'YOUR_API_KEY';
const client = new ExchangeRateApiClient({ apiKey });

(async () => {
  try {
    // Example A: Latest with base only
    const latestUsd = await client.getLatest({ base: 'USD' });
    console.log('Latest (base=USD):', latestUsd && latestUsd.rates ? Object.keys(latestUsd.rates).slice(0,5) : latestUsd);

    // Example B: Latest with base and symbols filter
    const latestEurSubset = await client.getLatest({ base: 'EUR', symbols: ['USD', 'GBP', 'JPY'] });
    console.log('Latest (base=EUR, symbols=USD,GBP,JPY):', latestEurSubset);
  } catch (err) {
    console.error('Error running latest examples:', err.message);
  }
})();
