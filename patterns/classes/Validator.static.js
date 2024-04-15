const {
  MissingValueError,
  FailedValidationError,
} = require("../../classes/errors/error.prototypes");
const REGEX = require("../../data/REGEX.constant");
class Validator {
  static isNotEmpty(value, service = undefined, field = undefined) {
    if (
      REGEX.EMPTY_STRING.test(value) ||
      [null, undefined, NaN].includes(value)
    ) {
      throw new MissingValueError(service, field);
    }
    return true;
  }

  static isAlphabetic(value, service = undefined, field = undefined) {
    if (!REGEX.ONLY_ALPHABETS.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }

  static isEmail(value, service = undefined, field = undefined) {
    if (!REGEX.EMAIL.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }

  static isPhone(value, service = undefined, field = undefined) {
    if (!REGEX.ONLY_NUMBERS.test(value) || !REGEX.PHONE_NUMBER.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }

  static isInArray(value, array, service = undefined, field = undefined) {
    if (!array.includes(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }
}

module.exports = Validator;
