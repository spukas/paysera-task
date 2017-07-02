import processData from '../processData';

const cashIn = { date: '2016-01-05', user_id: 1, user_type: 'natural', type: 'cash_in', operation: { amount: 200.00, currency: 'EUR' } };
const natural = { date: '2016-01-06', user_id: 1, user_type: 'natural', type: 'cash_out', operation: { amount: 30000, currency: 'EUR' } };
const juridical = { date: '2016-01-06', user_id: 2, user_type: 'juridical', type: 'cash_out', operation: { amount: 300.00, currency: 'EUR' } };

const config = {
  configCashIn: { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
  configNatural: { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } },
  configJuridical: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
};

describe('processData function', () => {
  it('counts commissions correctly for cash-in', () => {
    expect(processData(cashIn, config)).toEqual(0.06);
  });

  it('counts commissions correctyle for natural', () => {
    expect(processData(natural, config)).toEqual(87);
  });

  it('counts commissions correctyle for juridical', () => {
    expect(processData(juridical, config)).toEqual(0.9);
  });
});
