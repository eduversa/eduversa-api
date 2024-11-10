const { HTTP_STATUS, ROLES } = require("../data");
const { Response, MailSender, Parser } = require("../helpers");
const {
  AccountService,
  ApplicantService,
  FacultyService,
  AuthenticationService,
  StudentService,
} = require("../services");

class AccountController {
  static testRoute = async (req, res, next) => {
    res.send("This Router is Working");
  };

  // Pending (Done for applicant, faculty)
  static createNewAccountWithoutToken = async (req, res, next) => {
    try {
      // get data from request
      const { email, passkey } = req.body;
      if (passkey !== "EduversaDev@1") {
        throw new Error("Invalid Passkey");
      }
      let type = req.query.type;
      type = type ? type : "applicant";

      // create new account
      const { account, password } = await AccountService.createNewAccount(
        email,
        type
      );

      // create new profile based on account type
      let profile = null;
      // TODO: create a profile for the type of account created
      switch (type) {
        case "applicant":
          profile = await ApplicantService.createNewApplicantUsingAccount(
            account
          );
          break;
        case "student":
          console.log("Student Profile Not Implemented");
          break;
        case "faculty":
          profile = await FacultyService.createNewFacultyUsingAccount(account);
          break;
        case "admin":
          console.log("Admin Profile Not Implemented");
          break;
        case "superadmin":
          console.log("SuperAdmin Profile Not Implemented");
          break;

        default:
          break;
      }
      new MailSender.UserIdPasswordMail()
        .setDestinationEmail(account.email)
        .setSubject("Eduversa Account Creation Verification")
        .setContent({ user_id: account.user_id, password })
        .send();

      new Response.Created(res)
        .setMessage("Account Created Successfully")
        .setData(account)
        .send();
    } catch (error) {
      console.log("Error - AccountController - CreateNewAccount");
      next(error);
    }
  };
  // Pending (Done for applicant, faculty)
  static createNewAccount = async (req, res, next) => {
    try {
      // get data from request
      const email = req.body.email;
      let type = req.query.type;
      type = type ? type : "applicant";

      if (type !== "applicant") {
        const accountFromToken =
          await AuthenticationService.getAccountFromToken(
            req.headers.authorization
          );

        if (
          !(await AuthenticationService.checkAccessLevel(
            accountFromToken,
            ROLES.ADMIN.ACCESS_LEVEL
          ))
        ) {
          throw new Error("Not Allowed");
        }
      }

      // create new account
      const { account, password } = await AccountService.createNewAccount(
        email,
        type
      );

      // create new profile based on account type
      let profile = null;
      // TODO: create a profile for the type of account created
      switch (type) {
        case "applicant":
          profile = await ApplicantService.createNewApplicantUsingAccount(
            account
          );
          break;
        case "student":
          console.log("Student Profile Not Implemented");
          break;
        case "faculty":
          profile = await FacultyService.createNewFacultyUsingAccount(account);
          break;
        case "admin":
          console.log("Admin Profile Not Implemented");
          break;
        case "superadmin":
          console.log("SuperAdmin Profile Not Implemented");
          break;

        default:
          break;
      }
      new MailSender.UserIdPasswordMail()
        .setDestinationEmail(account.email)
        .setSubject("Eduversa Account Creation Verification")
        .setContent({ user_id: account.user_id, password })
        .send();

      new Response.Created(res)
        .setMessage("Account Created Successfully")
        .setData(account)
        .send();
    } catch (error) {
      console.log("Error - AccountController - CreateNewAccount");
      next(error);
    }
  };
  // Done
  static getSingleAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.getAccountByEmailOrUserId(query);
      new Response.Ok(res)
        .setMessage("Account Found Successfully")
        .setData(account)
        .send();
    } catch (error) {
      console.log("Error - AccountController - getSingleAccount");
      next(error);
    }
  };
  // Pending (Done for applicant)
  static deleteSingleAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.deleteAccountByEmailOrUserId(query);

      // TODO: Delete the profiles
      switch (account.type) {
        case "applicant":
          const applicant = await ApplicantService.deleteApplicantByUserId(
            account.user_id
          );
          break;

        default:
          break;
      }
      // TODO: Send Email
      new Response.Ok(res)
        .setMessage("Account Deleted Successfully")
        .setData(account)
        .send();
    } catch (error) {
      console.log("Error - AccountController - deleteSingleAccount");
      next(error);
    }
  };
  // Done
  static generateOtp = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.generateNewOtp(query);
      new Response.Created(res)
        .setMessage("OTP has been sent to the email")
        .send();
    } catch (error) {
      console.log("Error - AccountController - generateOtp");
      next(error);
    }
  };
  // Done
  static verifyOtp = async (req, res, next) => {
    try {
      const { query, otp } = req.query;
      const account = await AccountService.verifyOtp(query, otp);

      next();
    } catch (error) {
      console.log("Error - AccountController - verifyOtp");
      next(error);
    }
  };
  // Done
  static getUserId = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.getAccountByEmailOrUserId(query);
      // TODO: Send Mail
      new Response.Ok(res)
        .setMessage("User ID has been sent to your email")
        .send();
    } catch (error) {
      console.log("Error - AccountController - getUserId");
      next(error);
    }
  };
  // Done
  static logIntoAccount = async (req, res, next) => {
    try {
      const { user_id, password } = req.body;
      const { account, token } = await AccountService.logIntoAccount(
        user_id,
        password
      );
      let profile = null;
      switch (account.type) {
        case "applicant":
          profile = await ApplicantService.readApplicantByUserId(
            account.user_id
          );
          break;
        case "student":
          profile = await StudentService.getStudentUsingUserId(account.user_id);
          break;
        case "faculty":
          profile = await FacultyService.getOneFacultyByUserIdOrFacultyId(
            account.user_id
          );
          break;

        case "admin":
          break;
        case "superadmin":
          break;

        default:
          break;
      }

      const response = new Response.Ok(res)
        .setMessage("Logged In Successfully")
        .setData(account)
        .setAttribute("authToken", token)
        .setAttribute("profileData", profile)
        .send();
    } catch (error) {
      console.log("Error - AccountController - logIntoAccount");
      next(error);
    }
  };
  // Done
  static logoutFromOneAccount = async (req, res, next) => {
    try {
      const { account } = req;
      const { user_id } = req.query;
      const token = req.headers.authorization;
      if (account.user_id != user_id) {
        throw new Error("Logout failed");
      }
      const newAccount = await AccountService.logoutFromOneAccount(
        user_id,
        token
      );
      new Response.Ok(res)
        .setMessage("Logged Out Successfully")
        .setData(newAccount)
        .send();
    } catch (error) {
      console.log("Error - AccountController - logoutFromOneAccount");
      next(error);
    }
  };
  // Done
  static createNewAccountUsingSocialMedia = async (req, res, next) => {
    try {
      const { platform } = req.query;
      const { image, personal_info } = Parser.parsePlatfomData(
        req.body,
        platform
      );

      const { account, password } = await AccountService.createNewAccount(
        personal_info.email,
        "applicant"
      );

      const applicant = await ApplicantService.createNewApplicant({
        image,
        user_id: account.user_id,
        personal_info,
      });

      // TODO: Send EMail
      new MailSender.UserIdPasswordMail()
        .setDestinationEmail(account.email)
        .setSubject("Eduversa Account Creation Verification")
        .setContent({ user_id: account.user_id, password })
        .send();

      new Response.Created(res)
        .setMessage("Created Account Successfully")
        .setData({ account, applicant })
        .send();
    } catch (error) {
      console.log(
        "Error - AccountController - createNewAccountUsingSocialMedia"
      );
      next(error);
    }
  };
  // Done
  static logIntoAccountUsingSocialMedia = async (req, res, next) => {
    try {
      const { platform } = req.query;
      const { image, personal_info } = Parser.parsePlatfomData(
        req.body,
        platform
      );

      const { account, token } =
        await AccountService.logIntoAccountWithoutPassword(personal_info.email);

      const applicant = await ApplicantService.readApplicantByUserId(
        account.user_id
      );

      // TODO: Send EMail
      const response = new Response.Ok(res)
        .setMessage("Logged In Successfully")
        .setData(account)
        .setAttribute("authToken", token)
        .setAttribute("profileData", profile)
        .send();
    } catch (error) {
      console.log("Error - AccountController - logIntoAccountUsingSocialMedia");
    }
  };

  // Done
  static changePassword = async (req, res, next) => {
    try {
      const { query } = req.query;
      const { password, confirm_password } = req.body;
      if (password !== confirm_password) {
        throw new Error("Passwords do not match");
      }
      const account = await AccountService.changePassword(query, password);

      // TODO: Send Mail
      new Response.Created(res)
        .setMessage("Password Changed Successfully")
        .send();
    } catch (error) {
      console.log("Error - AccountController - changePassword");
      next(error);
    }
  };
}

module.exports = AccountController;
