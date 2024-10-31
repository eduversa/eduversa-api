const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Generator, ClientError } = require("../helpers");
const AccountModel = require("../models/account.model");
class AccountRepository {
  security_token;
  permissions;
  email;
  user_id;
  password;
  otp;
  type;
  access_level;
  tokens;
  createdAt;
  updatedAt;

  constructor(builder) {
    if (builder && typeof builder == "object") {
      this.setAccountData(builder);
    }
  }

  setAccountData(data) {
    this.security_token = data.security_token || null;
    this.permissions = data.permissions || null;
    this.email = data.email || null;
    this.user_id = data.user_id || null;
    this.password = data.password || null;
    this.otp = data.otp || null;
    this.type = data.type || null;
    this.access_level = data.access_level || null;
    this.tokens = data.tokens || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    return this;
  }

  setCreatedAt(date) {
    this.createdAt = new Date(date);
  }
  setUpdatedAt(date) {
    this.updatedAt = new Date(date);
  }
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
  async verifyPassword(password) {
    try {
      if (!(await bcrypt.compare(password, this.password))) {
        throw new ClientError.Unauthorized("Incorrect Credentials");
      }
    } catch (error) {
      console.log("Error - AccountRepository - VerifyPassword");
      throw error;
    }
  }
  async verifyOtp(otp) {
    try {
      if (otp !== this.otp) {
        throw new ClientError.Unauthorized("Invalid OTP");
      }
      return this;
    } catch (error) {
      console.log("Error - AccountRepository - VerifyOTP");
      throw error;
    }
  }
  getAuthToken() {
    return this.tokens[this.tokens.length - 1].token;
  }
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  getPublicData() {
    return this;
    // TODO: Uncomment Later
    // return {
    //   first_name: this.first_name,
    //   middle_name: this.middle_name,
    //   last_name: this.last_name,
    //   user_id: this.user_id,
    //   credit: this.credit,
    //   email: this.email,
    //   phone: this.phone,
    //   createdAt: this.createdAt,
    //   updatedAt: this.updatedAt,
    // };
  }

  //   Section: CRUD Operations

  create = async () => {
    try {
      await this.hashPassword();
      const data = new AccountModel(this);
      const account = await data.save();
      this.setAccountData(account);
      console.log("New Account Created: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - AccountRepository - Create");
      throw error;
    }
  };
  async read(query = {}) {
    try {
      const account = await AccountModel.findOne(query);
      if (!account) return false;
      this.setAccountData(account);
      console.log("Account Read: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Read");
      throw error;
    }
  }

  async mustExist(query = {}, err) {
    try {
      const account = await AccountModel.findOne(query);
      if (!account)
        throw err ? err : new ClientError.NotFound("Account does not exist");
      this.setAccountData(account);
      //   console.log("Account Read: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Repository - Must Exist");
      throw error;
    }
  }
  async mustNotExist(query = {}) {
    try {
      const account = await AccountModel.findOne(query);
      if (account) throw new ClientError.Conflict("Account already exists");
    } catch (error) {
      console.log("Error - Account Builder - Must Not Exist");
      throw error;
    }
  }

  async update(query) {
    try {
      const account = await AccountModel.findOneAndUpdate(query, this, {
        new: true,
      });
      this.setAccountData(account);
      console.log("Account Updated: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Update");
      throw error;
    }
  }

  async delete() {
    try {
      const account = await AccountModel.findOneAndDelete(this);
      if (!account) return false;
      this.setAccountData(account);
      console.log("Account Deleted: " + this.email);
      return this;
    } catch (error) {
      console.log("Error - Account Builder - Delete");
      throw error;
    }
  }

  static Builder = class {
    // Dropped: first_name, middle_name, last_name, phone
    security_token;
    permissions;
    email;
    user_id;
    password;
    otp;
    type;
    access_level;
    tokens;

    constructor(data) {
      if (data && typeof data == "object") {
        this.setSecurityToken(data.security_token)
          .setPermissions(data.permissions)
          .setEmail(data.email)
          .setUserId(data.user_id)
          .setPassword(data.password)
          .setOtp(data.otp)
          .setType(data.type)
          .setAccessLevel(data.access_level)
          .setTokens(data.tokens);
      }
    }

    setDefault() {
      this.setPermissions([])
        .setTokens([])
        .setUserId(Generator.getUserId())
        .setPassword(Generator.getPassword())
        .setOtp(Generator.getOtp());
      return this;
    }
    // Section: Setters
    setSecurityToken(token) {
      this.security_token = token;
      return this;
    }
    setPermissions(array) {
      this.permissions = array;
      return this;
    }
    setEmail(email) {
      // Todo: Validate Email
      this.email = email;
      return this;
    }
    setUserId(user_id) {
      // Todo: Validate User ID
      this.user_id = user_id;
      return this;
    }
    setPassword(password) {
      // Todo: Validate Password
      this.password = password;
      return this;
    }
    setOtp(otp) {
      this.otp = otp;
      return this;
    }
    setType(type) {
      // Todo: Check if type if valid
      this.type = type;
      return this;
    }
    setAccessLevel(access_level) {
      // Todo: Validate AccessLevel
      this.access_level = access_level;
      return this;
    }
    setTokens(tokens) {
      this.tokens = tokens;
      return this;
    }

    // Section: Getters
    getSecurityToken() {
      return this.security_token;
    }
    getPermissions() {
      return this.permissions;
    }
    getEmail() {
      return this.email;
    }
    getUserId() {
      return this.user_id;
    }
    getPassword() {
      return this.password;
    }
    getOtp() {
      return this.otp;
    }
    getType() {
      return this.type;
    }
    getAccessLevel() {
      return this.access_level;
    }
    getTokens() {
      return this.tokens;
    }

    // Section: Generators
    generateSecurityToken() {
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
    removeAuthToken(token) {
      this.tokens = this.tokens.filter((element) => element.token !== token);
      return this;
    }

    build = () => {
      return new AccountRepository(this);
    };
  };
}

module.exports = AccountRepository;
