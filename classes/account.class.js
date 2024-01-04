import { generateOTP } from "../controllers/accounts.controllers";
import {
  genearatePassword,
  generateUserID,
} from "../functions/random.functions";
import AccountCollection from "../models/accounts.model";
const jwt = require("jsonwebtoken");

export class Account {
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
    this.security_token = jwt.sign(
      { user_id: this.user_id },
      process.env.SECURITY_KEY
    );
    this.permissions = [];
    this.first_name = "";
    this.middle_name = "";
    this.last_name = "";
    this.email = "";
    this.user_id = generateUserID();
    this.phone = null;
    this.password = "Test@1234";
    // this.password = genearatePassword()
    this.otp = "12345678";
    // this.otp = generateOTP();
    this.type = "applicant";
    this.accessLevel = 1;
    this.tokens = [];
  }


  // async doesNot


  async findOneByUserID(user_id) {
    try {
      const accountData = await AccountCollection.findOne({ user_id });

      return this;
    } catch (error) {
      throw new NotFoundError("Account", "UserID", user_id);
    }
  }
}

module.exports = Account;
