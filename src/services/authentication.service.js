const { AccountRepository } = require("../repositories");
const jwt = require("jsonwebtoken");

class AuthenticationService {
  static getAccountFromToken = async (token) => {
    try {
      console.log("Running Token Authentication");
      if (!token) {
        throw new Error("No Token Found");
      }

      const account = await new AccountRepository().mustExist(
        {
          "tokens.token": token,
        },
        new Error("Invalid Token Error")
      );
      const tokenData = jwt.verify(token, process.env.SECRET_KEY);

      if (tokenData.user_id !== account.user_id) {
        throw new Error("Unauthorized Access Attempt");
      }

      return account;
    } catch (error) {
      console.log("Error - AuthenticationService - getAccountFromToken");
      throw error;
    }
  };
  static checkAccessLevel = async (account, access_level) => {
    try {
      console.log("Running Access Authorization");
      if (!account) {
        throw new Error("Please Login First");
      }
      console.log(account.access_level >= access_level);
      return account.access_level >= access_level;
    } catch (error) {
      console.log("Error - AuthenticationService - checkAccessLevel");
      throw error;
    }
  };
  static checkAccessLevelStrict = async (account, access_level) => {
    try {
      if (!account) {
        throw new Error("Please Login First");
      }

      return account.access_level == access_level;
    } catch (error) {
      console.log("Error - AuthenticationService - checkAccessLevelStrict");
      throw error;
    }
  };
  static checkPermission = async (account, permission) => {
    try {
      if (!account) {
        throw new Error("Please Login First");
      }

      return permission && account.hasPermission(permission);
    } catch (error) {
      console.log("Error - AuthenticationService - checkPermission");
      throw error;
    }
  };
}
module.exports = AuthenticationService;
