const { ROLES } = require("../data");
const { AccountRepository } = require("../repositories");
const jwt = require("jsonwebtoken");

class Authentication {
  static isLoggedIn = async (req, res, next) => {
    try {
      if (process.env.NODE_ENV == "development") {
        next();
        return;
      }
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("No Token Found");
      }

      const account = await new AccountRepository().mustExist({
        "tokens.token": token,
      });

      const tokenData = jwt.verify(token, process.env.SECRET_KEY);

      if (tokenData.user_id !== account.user_id) {
        throw new Error("Unauthorized Access Attempt");
      }

      req.account = account;
      next();
    } catch (error) {
      console.log("Error - Authentication - isLoggedIn");
      next(error);
    }
  };
  static studentAndAbove = (permission = undefined) => {
    return async (req, res, next) => {
      try {
        if (process.env.NODE_ENV == "development") {
          next();
          return;
        }
        const { account } = req;

        if (account.access_level >= 2) {
          next();
          return;
        } else if (permission && account.hasPermission(permission)) {
          next();
        } else {
          throw new Error("Access not allowed");
        }
        // Check: Add permission check (add an else if)
      } catch (error) {
        console.log("Error - Authentication - studentAndAbove");
        next(error);
      }
    };
  };
  static facultyAndAbove = (permission = undefined) => {
    return async (req, res, next) => {
      try {
        if (process.env.NODE_ENV == "development") {
          next();
          return;
        }
        const { account } = req;

        if (account.access_level >= 3) {
          next();
          return;
        } else if (permission && account.hasPermission(permission)) {
          next();
        } else {
          throw new Error("Access not allowed");
        }
        // Check: Add permission check (add an else if)
      } catch (error) {
        console.log("Error - Authentication - facultyAndAbove");
        next(error);
      }
    };
  };
  static adminAndAbove = (permission = undefined) => {
    return async (req, res, next) => {
      try {
        if (process.env.NODE_ENV == "development") {
          next();
          return;
        }
        const { account } = req;

        if (account.access_level >= 4) {
          next();
          return;
        } else if (permission && account.hasPermission(permission)) {
          next();
        } else {
          throw new Error("Access not allowed");
        }
        // Check: Add permission check (add an else if)
      } catch (error) {
        console.log("Error - Authentication - adminAndAbove");
        next(error);
      }
    };
  };
}
module.exports = Authentication;
