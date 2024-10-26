const { HTTP_STATUS } = require("../../data");
class BaseError extends Error {
  statusCode = null;
  constructor(code, message) {
    super(message);
    this.statusCode = code || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }

  getMessage() {
    return this.message;
  }
  getStatusCode() {
    return this.code;
  }
}

module.exports = BaseError;
