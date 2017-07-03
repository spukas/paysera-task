import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import app from '../app';
import api from '../constants';

const { CASH_IN, NATURAL, JURIDICAL, RATES } = api;

const mock = new MockAdapter(axios);

const cashIn = { percents: 0.03, max: { amount: 5, currency: 'EUR' } };
const cashOutNatural = { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } };
const cashOutJuridical = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };
const configRates = { EUR: { USD: 1.1497, JPY: 129.53 } };

mock.onGet(CASH_IN).reply(200, cashIn);
mock.onGet(NATURAL).reply(200, cashOutNatural);
mock.onGet(JURIDICAL).reply(200, cashOutJuridical);
mock.onGet(RATES).reply(200, configRates);

describe('app', () => {
  it('works as espected', async () => {
    expect.assertions(1);
    const data = await app('./input.json');
    await expect(data).toEqual([0.06, 0.9, 0, 0.7, 0.3, 0.3, 5, 0, 0]);
  });
});
