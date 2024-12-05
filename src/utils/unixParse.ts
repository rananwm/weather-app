import moment from 'moment';

export const getTime = (dt, formatString) => {
  return moment.unix(dt).format(formatString);
};
export const getDateTime = (dt, formatString) => {
  const givenDate = moment.unix(dt);
  const today = moment().startOf('day');
  const tomorrow = moment().add(1, 'days').startOf('day');

  // Check if the date is today or tomorrow
  if (givenDate.isSame(today, 'day')) {
    return 'Today';
  } else if (givenDate.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else {
    return givenDate.format(formatString);
  }
};
