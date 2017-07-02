import moment from 'moment';

const userHistory = {};

export default ({
  date,
  user_id: userId,
  user_type: userType,
  type,
  operation: { amount },
}, { configCashIn, configJuridical, configNatural }) => {
  if (type === 'cash_in') {
    return Math.min((amount * configCashIn.percents * 0.01), configCashIn.max.amount);
  }

  if (userType === 'natural') {
    if (!userHistory[userId]) userHistory[userId] = [];
    const weekOfYear = moment(new Date(date)).isoWeek();
    const weekCheckOut = userHistory[userId]
      .reduce((result, entry) =>
        (weekOfYear === entry.weekOfYear ? result + entry.amount : result), 0);
    const freeWeekCheckOutLeft = Math.max(configNatural.week_limit.amount - weekCheckOut, 0);
    userHistory[userId] = [...userHistory[userId], { weekOfYear, amount }];
    return Math.max(configNatural.percents * 0.01 * (amount - freeWeekCheckOutLeft), 0);
  }

  return Math.max((amount * configJuridical.percents * 0.01), configJuridical.min.amount);
};
