const express = require("express");
class BaseRouter {
  router = express.Router();

  configure() {
    throw new Error("Method Implementation Not Found");
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRouter;
