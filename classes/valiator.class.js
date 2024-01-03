const {
  emptyStringRegEx,
  emailRegex,
  contactRegex,
  alphabetRegex,
} = require("../functions/data/RegEx.data");
const {
  MissingValueError,
  FailedValidationError,
} = require("./errors/error.prototypes");

class Validator {
  isEmpty(value, service = undefined, field = undefined) {
    if (
      emptyStringRegEx.test(value) ||
      [null, undefined, NaN].includes(value)
    ) {
      throw new MissingValueError(service, field);
    }
    return true;
  }
  isAlphabetString(value, service = undefined, field = undefined) {
    if (!alphabetRegex.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }
  isValidEmail(value, service = undefined, field = undefined) {
    if (!emailRegex.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }
  isValidContact(value, service = undefined, field = undefined) {
    if (!contactRegex.test(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }
  isInArray(value, array, service = undefined, field = undefined) {
    if (!array.includes(value)) {
      throw new FailedValidationError(service, field, value);
    }
    return true;
  }
}

const validate = new Validator();
module.exports = validate;
