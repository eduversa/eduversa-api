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

const createNewAccount = async (req, res) => {
  try {
    const { email } = req.body;
    // const {name, email, phone, password, confirm_password} = req.body;

    const existingAccount = await AccountCollection.findOne({ email });
    if (existingAccount) {
      return res
        .status(200)
        .send({ status: false, message: "Account already exists" });
    }

    // const nameObject = formatName(name);
    // if(!nameObject){
    //     return res.status(200).send({status: false, message: "Invalid Name"})
    // }

   

    const user_id = generateUserID();
    //red-f// const password = genearatePassword();
    const password = "Test@1234";
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email, user_id }, process.env.SECRET_KEY);
    const tokens = [{ token }];

    const newAccount = new AccountCollection({
      email,
      user_id,
      password: hashedPassword,
      tokens,
    });


    const newApplicant = new ApplicantCollection({personal_info:  {email: email}, user_id: user_id})
    const addedApplicant = newApplicant.save()


    const emailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "EduVersa Account Creation Confirmation",
      text: `User ID: ${user_id}\nPassword: ${password}`,
    };
    sendEmail(emailOptions);
    const addedAccount = await newAccount.save();

    res.status(200).send({
      status: true,
      message: "Account Creation Success",
      data: addedAccount,
    });
    // console.log(newAccount);
  } catch (error) {
    console.log("Error in createNewAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const getSingleAccount = async (req, res) => {
  try {
    const {query}=req.query;
    const accountData = await AccountCollection.findOne({$or: [
        {email: query},
        {user_id: query},
    ]})
    console.log(accountData)
    if(!accountData){
        return res.status(200).send({status: false, message: "No Account Found"})
    }
    res.status(200).send({status: true, message: "Account Found", data: accountData})
  } catch (error) {
    console.log("Error in getSingleAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};


const changePassword = async (req, res) => {
  try {
    const {isOTPVerified} = req.params
    if(!isOTPVerified){
        throw new Error("OTP was not verified")
    }

    const {password, confirm_password} = req.body;
    const {user_id} = req.query;

     if(password!==confirm_password){
        return res.status(200).send({status: false, message: "Passwords do not match"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const updatedAccount = await AccountCollection.findOneAndUpdate({user_id}, {password: hashedPassword}, {new: true})

    res.status(200).send({status: true, message: "Password Changed Successfully"})


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
    const {user_id} = req.query;

    const isExistingAccount = await AccountCollection.findOne({user_id})
    if(!isExistingAccount){
        return res.status(200).send({status: false, message: "Account Not Found"})
    }

    //red-f// const otp = createOTP()
    const otp = "12345678"
    const updatedAccount = await AccountCollection.findOneAndUpdate({user_id: isExistingAccount.user_id}, {otp: otp}, {new: true})

    const emailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: isExistingAccount.email,
        subject: "OTP for EduVersa Account",
        text: `OTP: ${otp}`
    }
    sendEmail(emailOptions);

    res.status(200).send({status: true, message: "OTP has been sent to your email"})

  } catch (error) {
    console.log("Error in generateOTP");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};


const verifyOTP = async (req, res, next) => {
  try {
    const {user_id, otp} = req.query;

    const isExistingAccount = await AccountCollection.findOne({user_id})
    if(!isExistingAccount){
        return res.status(200).send({status: false, message: "Account Not Found"})
    }

    if(isExistingAccount.otp!==otp){
        return res.status(200).send({status: false, message: "Invalid OTP"})
    }

    //red-f// UNCOMMENT Later
    // const updatedAccount = await AccountCollection.findOneAndUpdate({user_id}, {otp: null}, {new: true})
    // console.log(updatedAccount)
    req.params.isOTPVerified = true
    next()
  } catch (error) {
    console.log("Error in verifyOTP");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const loginToAccount = async (req, res) => {
  try {
    const {user_id, password} = req.body;

    const isExistingAccount = await AccountCollection.findOne({user_id})
    if(!isExistingAccount){
        return res.status(200).send({status: false, message: "No Account Found"})
    }

    const isPasswordVerified = await bcrypt.compare(password, isExistingAccount.password)
    if(!isPasswordVerified){
        return res.status(200).send({status: false, message: "Incorrect Credentials"})
    }

    const token = jwt.sign({email: isExistingAccount.email, user_id: isExistingAccount.user_id}, process.env.SECRET_KEY);

    const tokens = isExistingAccount.tokens
    tokens.push({token})

    const updatedAccount = await AccountCollection.findOneAndUpdate({user_id}, {tokens}, {new: true});

    res.status(200).send({status: true, message: "Logged In Successfully", data: updatedAccount, authToken: token})


  } catch (error) {
    console.log("Error in loginToAccount");
    console.log(error);
    res.send({ status: false, message: "Internal Server Error" });
  }
};

const logoutFromOneAccount = async (req, res) => {
  try {
    const {user_id} = req.headers
    const token = req.headers.authorization

    const accountData = await AccountCollection.findOne({user_id})
    if(!accountData){
        return res.status(200).send({status: false, message: "No account found"})
    }


    let tokens = accountData.tokens
    tokens = tokens.filter(element=>element.token!==token)


    const updatedAccount = await AccountCollection.findOneAndUpdate({user_id: user_id}, {tokens}, {new: true})

    res.status(200).send({status: true, message: "Logged Out Successfully"})
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
};
