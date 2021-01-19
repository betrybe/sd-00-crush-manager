const { MD5 } = require('crypto-js');
const { NO_DATE } = require('../dictionary/errors.dictionary');

const MIN = 0;
const MAX = 16;
const MIN_NAME = 3;
const MIN_PASS = 6;
const MAX_RATE = 5;
const MINOR = 18;
const DATED_LENGTH = 10;

const generateToken = ({ email }) => MD5(email).toString().substr(MIN, MAX);
const isValidEmail = ({ email }) => (
  email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i)
);
const isValidPassword = ({ password }) => password.toString().length >= MIN_PASS;
const isValidName = ({ name }) => name.length >= MIN_NAME;
const isValidAge = ({ age }) => Number(age) >= MINOR;
const isValidRate = ({ date: { rate } }) => rate > MIN && rate <= MAX_RATE;
const isValidToken = ({ authorization }) => authorization.length === MAX;
const isValidDate = ({ date }) => {
  if (typeof date !== 'object') return NO_DATE;
  if (!date.datedAt) return NO_DATE;
  if (!Object.keys(date).includes('rate')) return NO_DATE;
  return null;
};
const isValidDatedAt = ({ date: { datedAt } }) => datedAt.match(/\d{2}\/\d{2}\/\d{4}/ig)
  && datedAt.length === DATED_LENGTH;

module.exports = {
  generateToken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidRate,
  isValidToken,
  isValidDate,
  isValidDatedAt,
};
