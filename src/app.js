import axios from 'axios';

import readFile from './utils';
import processData from './processData';
import API from './constants';

const { CASH_IN, NATURAL, JURIDICAL, RATES } = API;

export default async (file) => {
  let result;
  try {
    const input = await readFile(file);
    // fetch configs for users
    const config = await axios.all(
      [CASH_IN, NATURAL, JURIDICAL, RATES].map(path => axios.get(path)),
      ).then(axios.spread((cashInResponse, naturalResponse, juridicalResponse, ratesResponse) => ({
        configCashIn: cashInResponse.data,
        configNatural: naturalResponse.data,
        configJuridical: juridicalResponse.data,
        configRates: ratesResponse.data,
      })));
    result = JSON.parse(input).map(entry => processData(entry, config));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return result;
};
