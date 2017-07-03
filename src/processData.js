import moment from 'moment';

const userHistory = {};

const convertToEUR = ({ amount, currency }, { EUR }) => {
  if (currency === 'USD') return amount / EUR.USD;
  if (currency === 'JPY') return amount / EUR.JPY;
  return amount;
};

const fromEUR = ({ currency }, { EUR }, amount) => {
  if (currency === 'USD') return amount * EUR.USD;
  if (currency === 'JPY') return amount * EUR.JPY;
  return amount;
};

const round = amount => Math.ceil(amount * 100) / 100;

// destructure operation entry and config
export default ({ date, user_id: userId, user_type: userType, type, operation },
  { configCashIn, configJuridical, configNatural, configRates }) => {
  // convert to EUR
  const amount = convertToEUR(operation, configRates);

  // takes commissions, converts to operation's currency, rounds up
  // added toFixed(4) because converting back to USD returns'0.30000000000000004'
  // and rounds up to 0.31
  const finalResult = (commissions) => {
    const converted = operation.currency === 'EUR' ? commissions : fromEUR(operation, configRates, commissions);
    return round(Number(converted.toFixed(4)));
  };

  if (type === 'cash_in') {
    const comm = Math.min((amount * configCashIn.percents * 0.01), configCashIn.max.amount);
    return finalResult(comm);
  }

  if (userType === 'natural') {
    if (!userHistory[userId]) userHistory[userId] = [];
    const weekOfYear = moment(new Date(date)).isoWeek();
    const weekCheckOut = userHistory[userId]
      .reduce((result, entry) =>
        (weekOfYear === entry.weekOfYear ? result + entry.amount : result), 0);
    const freeWeekCheckOutLeft = Math.max(configNatural.week_limit.amount - weekCheckOut, 0);
    userHistory[userId] = [...userHistory[userId], { weekOfYear, amount }];
    const comm = Math.max(configNatural.percents * 0.01 * (amount - freeWeekCheckOutLeft), 0);
    return finalResult(comm);
  }

  // for juridical operations
  const comm = Math.max((amount * configJuridical.percents * 0.01), configJuridical.min.amount);
  return finalResult(comm);
};
