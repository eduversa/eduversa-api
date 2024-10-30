class BaseResponse {
  res = null;
  code = null;
  message = null;
  data = null;

  setResObject(res) {
    this.res = res;
    return this;
  }
  setStatusCode(code) {
    this.code = code;
    return this;
  }
  setMessage(message) {
    this.message = message;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  send() {
    this.res.status(this.code).send({
      code: this.code,
      status: this.code >= 200 && this.code < 300,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = BaseResponse;
