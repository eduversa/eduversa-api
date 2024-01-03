class MissingValueError extends Error {
  constructor(service, field) {
    let message = "Missing Value Encountered";
    if (service) {
      if (!field) {
        message = `${service} has a missing value`;
      } else {
        message = `${service} has a missing value: ${field}`;
      }
    }
    super(message);
    this.message = message;
    this.status = 404;
  }
}
class NotFoundError extends Error {
  constructor(service, field, value) {
    let message = "Requested Resource Not Found";
    if (service) {
      if (!field || !value) {
        message = `No ${service.toLowerCase()} found`;
      } else {
        message = `No ${service.toLowerCase()} found for ${field}: ${value}`;
      }
    }
    super(message);
    this.message = message;
    this.status = 404;
  }
}

class FailedValidationError extends Error {
  constructor(service, field, value) {
    let message = "Cannot Validate Request";
    if (service) {
      if (!field || !value) {
        message = `Invalid Value For ${service.toLowerCase()}`;
      } else {
        message = `Invalid Value For ${service.toLowerCase()} ${field}: ${value}`;
      }
    }
    super(message);
    this.message = message;
    this.status = 400;
  }
}
class BadRequestError extends Error {
  constructor(service, event) {
    let message = "Request Could Not Be Processed";
    if (service) {
      if (!event) {
        message = `${service} Request Failed`;
      } else {
        message = `${service} ${event} Request Failed`;
      }
    }
    super(message);
    this.message = message;
    this.status = 400;
  }
}

module.exports = {
  MissingValueError,
  NotFoundError,
  FailedValidationError,
  BadRequestError,
};
