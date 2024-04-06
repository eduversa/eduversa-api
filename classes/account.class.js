const { ACCESS_LEVEL } = require("../config/roles");
const { generateOTP } = require("../controllers/accounts.controllers");
const {
  genearatePassword,
  generateUserID,
} = require("../functions/random.functions");
const AccountCollection = require("../models/accounts.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Account {
  security_token = "";
  permissions = [];
  first_name = "";
  middle_name = "";
  last_name = "";
  email = "";
  user_id = "";
  phone = "";
  password = "";
  otp = "";
  type = "";
  accessLevel = "";
  tokens = [];

  constructor() {
    this.user_id = generateUserID();
    this.security_token = jwt.sign(
      { user_id: this.user_id },
      process.env.SECURITY_KEY
    );
    this.permissions = [];
    this.first_name = "";
    this.middle_name = "";
    this.last_name = "";
    this.email = "";
    this.phone = null;
    this.password = "Test@1234";
    // this.password = genearatePassword()
    this.otp = "12345678";
    // this.otp = generateOTP();
    this.type = "applicant";
    this.accessLevel = 1;
    this.tokens = [];
  }

  setFirstName(value) {
    this.first_name = value;
    return this;
  }
  setMiddleName(value) {
    this.middle_name = value;
    return this;
  }
  setLastName(value) {
    this.last_name = value;
    return this;
  }

  setEmail(value) {
    this.email = value;
    return this;
  }

  setUserID(value) {
    this.user_id = value;
    return this;
  }

  setPhone(value) {
    this.phone = value;
    return this;
  }

  setPassword(value) {
    this.password = value;
    return this;
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
    return this;
  }

  setOTP(value) {
    this.otp = value;
    return this;
  }
  setType(value) {
    this.type = value;
    return this;
  }
  setAccessLevel(value) {
    this.accessLevel = ACCESS_LEVEL[value.toUpperCase()];
    return this;
  }
  setSecurityToken() {
    this.security_token = jwt.sign(
      { user_id: this.user_id, type: this.type },
      process.env.SECURITY_KEY
    );
    return this;
  }

  addAuthToken() {
    const token = jwt.sign(
      { user_id: this.user_id, email: this.email },
      process.env.SECRET_KEY
    );
    this.tokens.push({ token: token });
    return this;
  }
  // addPermission(permission) {
  //   this.permissions.push(permission);
  //   return this;
  // }

  async create() {
    try {
      const data = new AccountCollection({
        security_token: this.security_token,
        permissions: this.permissions,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        email: this.email,
        user_id: this.user_id,
        phone: this.phone,
        password: this.password,
        otp: this.otp,
        type: this.type,
        accessLevel: this.accessLevel,
        tokens: this.tokens,
      });

      const savedAccount = await data.save();
      this.permissions = savedAccount.permissions;
      this.first_name = savedAccount.first_name;
      this.middle_name = savedAccount.middle_name;
      this.last_name = savedAccount.last_name;
      this.email = savedAccount.email;
      this.user_id = savedAccount.user_id;
      this.phone = savedAccount.phone;
      this.password = savedAccount.password;
      this.otp = savedAccount.otp;
      this.type = savedAccount.type;
      this.accessLevel = savedAccount.accessLevel;
      this.tokens = savedAccount.tokens;
      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOne() {
    try {
      const accountData = await AccountCollection.findOne({
        $or: [{ userId: this.user_id }, { email: this.email }],
      });
      console.log(accountData);
      if (!accountData) {
        return false;
      }
      this.security_token = accountData.security_token;
      this.permissions = accountData.permissions;
      this.first_name = accountData.first_name;
      this.middle_name = accountData.middle_name;
      this.last_name = accountData.last_name;
      this.email = accountData.email;
      this.user_id = accountData.user_id;
      this.phone = accountData.phone;
      this.password = accountData.password;
      this.otp = accountData.otp;
      this.type = accountData.type;
      this.accessLevel = accountData.accessLevel;
      this.tokens = accountData.tokens;
      return this;
    } catch (error) {
      throw new NotFoundError("Account", "UserID", user_id);
    }
  }
}

module.exports = Account;
