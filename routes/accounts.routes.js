const express = require("express");
const {
  createNewAccount,
  getSingleAccount,
  generateOTP,
  changePassword,
  verifyOTP,
  loginToAccount,
  logoutFromOneAccount,
} = require("../controllers/accounts.controllers");
const { isAuthorizedAccess } = require("../middlewares/auth.middlewares");

const accountRouter = express.Router();

accountRouter.get("/test", (req, res) => {
  res.send("This Router is working");
});

accountRouter.route("/").post(createNewAccount).get(getSingleAccount);

accountRouter.route("/otp").put(generateOTP);

accountRouter.route("/password").put(verifyOTP, changePassword);

accountRouter
  .route("/auth")
  .post(loginToAccount)
  .patch(isAuthorizedAccess, logoutFromOneAccount);

//green-u// create new account
//green-u// read single account - query - userid, email
//blue-u// read multiple accounts - query - userid, email
//green-u// generate OTP
//green-u// verify OTP (middleware) // otp removal
//green-u// change password
//blue-u// forgot password
//green-u// login
//green-u// logout from one
//blue-u// logout from all

accountRouter.get("/help", (req, res) => {
  res.status(200).send({
    status: "This route is working",
    data: [
      {
        method: "POST",
        route: "/account/",
        desc: "create new account, email sent",
        body: ["email"],
      },
      {
        method: "GET",
        route: "/account/?query={{user_id or email}}",
        desc: "get single account",
      },
      {
        method: "PUT",
        route: "/account/otp?user_id={{user_id}}",
        desc: "creates new otp and sends to email",
      },
      {
        method: "PUT",
        route: "/account/password?user_id={{user_id}}&otp={{otp}}",
        desc: "change password",
        body: ["password", "confirm_password"],
      },
      {
        method: "POST",
        route: "/account/auth",
        desc: "login",
        body: ["user_id", "password"],
      },
      {
        method: "PATCH",
        route: "/account/auth?user_id={{user_id}}",
        desc: "logout from one account",
        header: ["authorization"],
      },
    ],
  });
});

module.exports = accountRouter;
