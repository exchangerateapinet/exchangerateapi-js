'use strict';

const https = require('https');
const { URL } = require('url');

class ExchangeRateApiClient {
  constructor({ apiKey, baseUrl = 'https://api.exchangerateapi.com/v1' } = {}) {
    if (!apiKey) throw new Error('apiKey is required');
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  _get(urlString) {
    return new Promise((resolve, reject) => {
      https
        .get(urlString, (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            try {
              const json = JSON.parse(body);
              if (json && json.error) {
                const err = new Error(json.error.message || 'API error');
                err.details = json;
                return reject(err);
              }
              resolve(json);
            } catch (err) {
              reject(err);
            }
          });
        })
        .on('error', reject);
    });
  }

  // Endpoint: /latest
  async getLatest({ base, symbols } = {}) {
    if (!base) throw new Error('base is required');
    const url = new URL(`${this.baseUrl}/latest`);
    url.searchParams.set('base', base);
    url.searchParams.set('apikey', this.apiKey);
    if (symbols && Array.isArray(symbols) && symbols.length > 0) {
      url.searchParams.set('symbols', symbols.join(','));
    }
    return this._get(url.toString());
  }

  // Endpoint: /historical
  async getHistorical({ date, base, symbols } = {}) {
    if (!date) throw new Error('date is required (YYYY-MM-DD)');
    if (!base) throw new Error('base is required');
    const url = new URL(`${this.baseUrl}/historical`);
    url.searchParams.set('date', date);
    url.searchParams.set('base', base);
    url.searchParams.set('apikey', this.apiKey);
    if (symbols && Array.isArray(symbols) && symbols.length > 0) {
      url.searchParams.set('symbols', symbols.join(','));
    }
    return this._get(url.toString());
  }
}

module.exports = { ExchangeRateApiClient };
