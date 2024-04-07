const { sendEmail } = require("../config/nodemailer.config");
const { formatName } = require("../functions/account.functions");
const {
  generateUserID,
  genearatePassword,
  createOTP,
} = require("../functions/random.functions");
const AccountCollection = require("../models/accounts.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ApplicantCollection } = require("../models/profile.models");
const {
  setCredentialsTemplate,
  setOTPTemplate,
  setUserIDTemplate,
} = require("../functions/template.functions");
const Account = require("../classes/account.class");
const Applicant = require("../classes/profiles/applicant.builder");

const createNewAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const account = new Account();
    account.setEmail(email);

    if (await account.findOne()) {
      return res
        .status(200)
        .send({ status: false, message: "Account already exists" });
    }

    account.setSecurityToken().addAuthToken();
    const password = account.password;
    await account.hashPassword();
    // console.log(account);
    await account.create();

    const applicant = new Applicant();
    applicant.setPersonalEmail(account.email);
    applicant.setUserID(account.user_id);
    await applicant.create();

    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: account.email,
      subject: "EduVersa Account Creation Confirmation",
      // text: `User ID: ${user_id}\nPassword: ${password}`,
      html: setCredentialsTemplate()
        .replace("{{USER_ID}}", account.user_id)
        .replace("{{PASSWORD}}", password),
    };
    sendEmail(emailOptions);

    res.status(200).send({
      status: true,
      message: "Account Creation Success",
      data: account,
    });
    // console.log(newAccount);
  } catch (error) {
    console.log("Error in createNewAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const createNewAccountUsingSocialMedia = async (req, res) => {
  try {
    const { platform } = req.query;
    let personal_info, image, email;

    // const {name, email, phone, password, confirm_password} = req.body;

    switch (platform) {
      case "google":
        email = req.body.user.email;
        const nameObject = formatName(req.body.user.name);
        personal_info = {
          first_name: nameObject.first_name,
          last_name: nameObject.last_name,
          email: email,
        };
        if (nameObject.middle_name) {
          personal_info.middle_name = nameObject.middle_name;
        }
        image = req.body.user.image;
        break;

      case "github":
        email = req.body.user.email;

        personal_info = {
          email: email,
        };
        image = req.body.user.image;
        break;

      default:
        break;
    }

    const account = new Account();
    account.setEmail(personal_info.email);

    if (await account.findOne()) {
      return res
        .status(200)
        .send({ status: false, message: "Account already exists" });
    }

    const password = account.password;
    await account.hashPassword();
    account.setSecurityToken().addAuthToken();
    await account.create();

    const applicant = new Applicant();
    applicant.personal_info = personal_info;
    applicant.setImage(image).setUserID(account.user_id);
    await applicant.create();

    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "EduVersa Account Creation Confirmation",
      html: setCredentialsTemplate()
        .replace("{{USER_ID}}", account.user_id)
        .replace("{{PASSWORD}}", password),
    };
    sendEmail(emailOptions);

    res.status(200).send({
      status: true,
      message: "Account Creation Success",
      data: account,
    });
  } catch (error) {
    console.log("Error in createNewAccountUsingSocialMedia");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error", error: error });
  }
};

// TRY to refactor using the class later
const getSingleAccount = async (req, res) => {
  try {
    const { query } = req.query;
    const accountData = await AccountCollection.findOne({
      $or: [{ email: query }, { user_id: query }],
    });
    console.log(accountData);
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }
    res
      .status(200)
      .send({ status: true, message: "Account Found", data: accountData });
  } catch (error) {
    console.log("Error in getSingleAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { isOTPVerified } = req.params;
    if (!isOTPVerified) {
      throw new Error("OTP was not verified");
    }

    const { password, confirm_password } = req.body;
    const { user_id } = req.query;

    if (password !== confirm_password) {
      return res
        .status(200)
        .send({ status: false, message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id },
      { password: hashedPassword },
      { new: true }
    );

    res
      .status(200)
      .send({ status: true, message: "Password Changed Successfully" });
  } catch (error) {
    console.log("Error in changePassword");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

// orange-f// Discuss
const forgotPassword = async (req, res) => {
  try {
    // const
  } catch (error) {
    console.log("Error in forgotPassword");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const generateOTP = async (req, res) => {
  try {
    // const {user_id} = req.query;

    // const isExistingAccount = await AccountCollection.findOne({user_id})
    // if(!isExistingAccount){
    //     return res.status(200).send({status: false, message: "Account Not Found"})
    // }

    const { query } = req.query;
    const accountData = await AccountCollection.findOne({
      $or: [{ email: query }, { user_id: query }],
    });
    // console.log(accountData)
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }

    //red-f// const otp = createOTP()
    const otp = "12345678";
    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id: accountData.user_id },
      { otp: otp },
      { new: true }
    );

    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: accountData.email,
      subject: "OTP for EduVersa Account",
      // text: `OTP: ${otp}`,
      html: setOTPTemplate()
        .replace("{{DATE}}", new Date().toDateString())
        .replace("{{OTP}}", otp),
    };
    sendEmail(emailOptions);

    res
      .status(200)
      .send({ status: true, message: "OTP has been sent to your email" });
  } catch (error) {
    console.log("Error in generateOTP");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { query, otp } = req.query;

    // const {query}=req.query;
    const isExistingAccount = await AccountCollection.findOne({
      $or: [{ email: query }, { user_id: query }],
    });
    // console.log(isExistingAccount)
    if (!isExistingAccount) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }

    if (isExistingAccount.otp !== otp) {
      return res.status(200).send({ status: false, message: "Invalid OTP" });
    }

    //red-f// UNCOMMENT Later
    // const updatedAccount = await AccountCollection.findOneAndUpdate({user_id}, {otp: null}, {new: true})
    // console.log(updatedAccount)
    req.params.isOTPVerified = true;
    next();
  } catch (error) {
    console.log("Error in verifyOTP");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const loginToAccount = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    const account = new Account();
    account.setUserID(user_id);
    const data = await account.findOne();

    if (!data) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }

    // const isExistingAccount = await AccountCollection.findOne({ user_id });
    // if (!isExistingAccount) {
    // }

    const isPasswordVerified = await bcrypt.compare(password, account.password);
    if (!isPasswordVerified) {
      return res
        .status(200)
        .send({ status: false, message: "Incorrect Credentials" });
    }

    account.addAuthToken();
    // const token = jwt.sign(
    //   { email: isExistingAccount.email, user_id: isExistingAccount.user_id },
    //   process.env.SECRET_KEY
    // );

    // const tokens = isExistingAccount.tokens;
    // tokens.push({ token });

    await account.update();
    // const updatedAccount = await AccountCollection.findOneAndUpdate(
    //   { user_id },
    //   { tokens },
    //   { new: true }
    // );

    let profileData;
    switch (account.type) {
      case "applicant":
        profileData = await ApplicantCollection.findOne({
          user_id: account.user_id,
        });
        break;

      default:
        break;
    }

    res.status(200).send({
      status: true,
      message: "Logged In Successfully",
      data: account,
      authToken: account.tokens[account.tokens.length - 1].token,
      profileData: profileData,
    });
  } catch (error) {
    console.log("Error in loginToAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const loginToAccountUsingSocialMedia = async (req, res) => {
  try {
    const { platform } = req.query;
    // let { session } = req.body;

    let email;

    // session = {
    //   expires: "2023-12-28T11:50:59.549Z",
    //   user: {
    //     email: "viditmodi2207@gmail.com",
    //     image:
    //       "https://lh3.googleusercontent.com/a/ACg8ocI3Kir-xZ-levJ4AqS7Wa1amlSOiiusYwwTBDpc_m5b2Q=s96-c",
    //     name: "Vidit Modi",
    //   },
    // };

    switch (platform) {
      case "google":
        email = req.body.user.email;
        break;
      case "github":
        email = req.body.user.email;
        break;

      default:
        break;
    }

    const account = new Account();
    account.setEmail(email)

    if (!await account.findOne()) {
      account.setSecurityToken().addAuthToken();
      const password = account.password;
      await account.hashPassword();
      // console.log(account);
      await account.create();

      const applicant = new Applicant();
      applicant.setPersonalEmail(account.email);
      applicant.setUserID(account.user_id);
      await applicant.create();

      const emailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: account.email,
        subject: "EduVersa Account Creation Confirmation",
        // text: `User ID: ${user_id}\nPassword: ${password}`,
        html: setCredentialsTemplate()
          .replace("{{USER_ID}}", account.user_id)
          .replace("{{PASSWORD}}", password),
      };
      sendEmail(emailOptions);

      res.status(200).send({
        status: true,
        message: "Account Creation Success",
        data: account,
      });
    }

    const token = jwt.sign(
      { email: isExistingAccount.email, user_id: isExistingAccount.user_id },
      process.env.SECRET_KEY
    );

    const tokens = isExistingAccount.tokens;
    tokens.push({ token });

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { email },
      { tokens },
      { new: true }
    );

    let profileData;
    switch (updatedAccount.type) {
      case "applicant":
        profileData = await ApplicantCollection.findOne({
          user_id: updatedAccount.user_id,
        });
        break;

      default:
        break;
    }

    res.status(200).send({
      status: true,
      message: "Logged In Successfully Using " + platform,
      data: updatedAccount,
      authToken: token,
      profileData: profileData,
    });
  } catch (error) {
    console.log("Error in loginToAccountUsingSocialMedia");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const logoutFromOneAccount = async (req, res) => {
  try {
    const { user } = req;
    const token = req.headers.authorization;

    const accountData = await AccountCollection.findOne({
      user_id: user.user_id,
    });
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No account found" });
    }

    let tokens = accountData.tokens;
    tokens = tokens.filter((element) => element.token !== token);

    const updatedAccount = await AccountCollection.findOneAndUpdate(
      { user_id: user.user_id },
      { tokens },
      { new: true }
    );

    res.status(200).send({ status: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logoutFromOneAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const logoutFromAllAccounts = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in logoutFromAllAccounts");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const getUserID = async (req, res) => {
  try {
    const { isOTPVerified } = req.params;
    if (!isOTPVerified) {
      throw new Error("OTP was not verified");
    }

    const { query } = req.query;
    const accountData = await AccountCollection.findOne({ email: query });
    // console.log(accountData)
    if (!accountData) {
      return res
        .status(200)
        .send({ status: false, message: "No Account Found" });
    }

    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: accountData.email,
      subject: "User ID for your EduVersa Account",
      // text: `User ID: ${accountData.user_id}`,
      html: setUserIDTemplate().replace("{{USER_ID}}", accountData.user_id),
    };
    // console.log(emailOptions)
    sendEmail(emailOptions);

    res
      .status(200)
      .send({ status: true, message: "User ID has been sent to your email" });
  } catch (error) {
    console.log("Error in getUserID");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createNewAccount,
  getSingleAccount,
  changePassword,
  forgotPassword,
  generateOTP,
  verifyOTP,
  loginToAccount,
  logoutFromOneAccount,
  logoutFromAllAccounts,
  getUserID,
  loginToAccountUsingSocialMedia,
  createNewAccountUsingSocialMedia,
};
