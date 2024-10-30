const { ROLES } = require("../data");
const { AccountRepository } = require("../repositories");
const { AuthenticationService } = require("../services");

class Authentication {
  static isLoggedIn = async (req, res, next) => {
    try {
      // if (process.env.NODE_ENV == "development") {
      //   next();
      //   return;
      // }
      const token = req.headers.authorization;

      const account = await AuthenticationService.getAccountFromToken(token);
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
        // if (process.env.NODE_ENV == "development") {
        //   next();
        //   return;
        // }
        const { account } = req;

        if (
          AuthenticationService.checkAccessLevel(
            account,
            ROLES.STUDENT.ACCESS_LEVEL
          ) ||
          AuthenticationService.checkPermission(account, permission)
        ) {
          next();
        } else {
          throw new Error("You are not allowed to access this resource");
        }
      } catch (error) {
        console.log("Error - Authentication - studentAndAbove");
        next(error);
      }
    };
  };
  static facultyAndAbove = (permission = undefined) => {
    return async (req, res, next) => {
      try {
        // if (process.env.NODE_ENV == "development") {
        //   next();
        //   return;
        // }
        const { account } = req;

        if (
          AuthenticationService.checkAccessLevel(
            account,
            ROLES.FACULTY.ACCESS_LEVEL
          ) ||
          AuthenticationService.checkPermission(account, permission)
        ) {
          next();
        } else {
          throw new Error("You are not allowed to access this resource");
        }
      } catch (error) {
        console.log("Error - Authentication - facultyAndAbove");
        next(error);
      }
    };
  };
  static adminAndAbove = (permission = undefined) => {
    return async (req, res, next) => {
      try {
        // if (process.env.NODE_ENV == "development") {
        //   next();
        //   return;
        // }
        const { account } = req;

        if (
          AuthenticationService.checkAccessLevel(
            account,
            ROLES.ADMIN.ACCESS_LEVEL
          ) ||
          AuthenticationService.checkPermission(account, permission)
        ) {
          next();
        } else {
          throw new Error("You are not allowed to access this resource");
        }
      } catch (error) {
        console.log("Error - Authentication - adminAndAbove");
        next(error);
      }
    };
  };
}
module.exports = Authentication;
