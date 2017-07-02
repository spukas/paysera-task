import axios from 'axios';

import readFile from './utils';
import processData from './processData';
import API from './constants';

const { CASH_IN, NATURAL, JURIDICAL } = API;

export default async (file) => {
  let result;
  try {
    const input = await readFile(file);
    // fetch configs for users
    const config = await axios.all([CASH_IN, NATURAL, JURIDICAL].map(path => axios.get(path)))
      .then(axios.spread((cashInResponse, naturalResponse, juridicalResponse) => ({
        configCashIn: cashInResponse.data,
        configNatural: naturalResponse.data,
        configJuridical: juridicalResponse.data,
      })));
    result = JSON.parse(input).map(entry => processData(entry, config));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return result;
};
