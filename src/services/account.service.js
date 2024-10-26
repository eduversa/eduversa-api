const { ROLES } = require("../data");
const { Generator } = require("../helpers");
const { AccountRepository } = require("../repositories");

class AccountService {
  static createNewAccount = async (email, type) => {
    try {
      let role = null;
      if (type) {
        role = ROLES.filter((element) => element.TYPE == type)[0];
      } else {
        role = ROLES.filter((element) => element.TYPE == "applicant")[0];
      }
      const account = new AccountRepository.Builder()
        .setDefault()
        .setEmail(email)
        .generateSecurityToken()
        .setType(role.TYPE)
        .setAccessLevel(role.ACCESS_LEVEL)
        .addAuthToken()
        .build();
      const password = account.password;
      await account.mustNotExist({ email: email });
      await account.create();
      return { account: account.getPublicData(), password };
    } catch (error) {
      console.log("Error - AccountService - CreateNewAccount");
      throw error;
    }
  };
  static getAccountByEmailOrUserId = async (query) => {
    try {
      const account = new AccountRepository();
      await account.mustExist({ $or: [{ email: query }, { user_id: query }] });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - getAccountByEmailOrUserId");
      throw error;
    }
  };
  static deleteAccountByEmailOrUserId = async (query) => {
    try {
      const account = new AccountRepository();
      await account.mustExist({ $or: [{ email: query }, { user_id: query }] });
      await account.delete();
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - deleteAccountByEmailOrUserId");
      throw error;
    }
  };
  static generateNewOtp = async (query) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        $or: [{ email: query }, { user_id: query }],
      });

      const account = new AccountRepository.Builder(existingAccount)
        .setOtp(Generator.getOtp())
        .build();
      await account.update({ user_id: account.user_id });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - Account Service - Generate New OTP");
      throw error;
    }
  };
  static verifyOtp = async (query, otp) => {
    try {
      const account = await new AccountRepository().mustExist({
        $or: [{ email: query }, { user_id: query }],
      });

      await account.verifyOtp(otp);
      // TODO: Remove OTP
      return account.getPublicData();
    } catch (error) {
      console.log("Error - Account Service - Verify OTP");
      throw error;
    }
  };
  static changeAccountType = async (user_id, access_level) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        user_id,
      });

      const account = new AccountRepository.Builder(existingAccount)
        .setType(ROLES[access_level - 1].TYPE)
        .setAccessLevel(ROLES[access_level - 1].ACCESS_LEVEL)
        .build();
      await account.update({ user_id: account.user_id });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - Account Service - Change Password");
      throw error;
    }
  };
  static changePassword = async (query, password) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        $or: [{ email: query }, { user_id: query }],
      });

      const account = new AccountRepository.Builder(existingAccount)
        .setPassword(password)
        .build();
      await account.hashPassword();
      await account.update({ user_id: account.user_id });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - Account Service - Change Password");
      throw error;
    }
  };
  static logIntoAccount = async (user_id, password) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        user_id,
      });

      await existingAccount.verifyPassword(password);

      const account = new AccountRepository.Builder(existingAccount)
        .addAuthToken()
        .build();
      const token = account.getAuthToken();
      await account.update({ user_id: account.user_id });
      return { account: account.getPublicData(), token };
    } catch (error) {
      console.log("Error - Account Service - logIntoAccount");
      throw error;
    }
  };
  static logIntoAccountWithoutPassword = async (email) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        email,
      });

      const account = new AccountRepository.Builder(existingAccount)
        .addAuthToken()
        .build();
      const token = account.getAuthToken();
      await account.update({ user_id: account.user_id });
      return { account: account.getPublicData(), token };
    } catch (error) {
      console.log("Error - Account Service - logIntoAccountWithoutPassword");
      throw error;
    }
  };
  static logoutFromOneAccount = async (user_id, token) => {
    try {
      const existingAccount = await new AccountRepository().mustExist({
        user_id,
      });

      const account = new AccountRepository.Builder(existingAccount)
        .removeAuthToken(token)
        .build();
      // const token = account.getAuthToken();
      await account.update({ user_id: account.user_id });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - Account Service - logoutFromOneAccount");
      throw error;
    }
  };
}

module.exports = AccountService;
