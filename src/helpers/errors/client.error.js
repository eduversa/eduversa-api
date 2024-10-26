const { HTTP_STATUS } = require("../../data");
const BaseError = require("./BASE.error");

class ClientError {
  static prefix = "ClientError";
  static NotFoundError = class extends BaseError {
    constructor(message) {
      super(HTTP_STATUS.NOT_FOUND, prefix + message);
    }
  };
}
module.exports = ClientError;
