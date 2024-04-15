const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  EMPTY_STRING: /^\s*$/,
  PHONE_NUMBER: /^[6789]\d{9}$/,
  ONLY_ALPHABETS: /^[a-zA-Z]+$/,
  ONLY_NUMBERS: /^[0-9]+$/,
  WHITESPACES: /\s/g,
};

module.exports = REGEX;
