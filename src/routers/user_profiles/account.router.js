const { AccountController } = require("../../controllers");
const { Authentication } = require("../../middlewares");
const BaseRouter = require("../BASE.router");

class AccountRouter extends BaseRouter {
  configure() {
    this.router.get("/test", AccountController.testRoute);
    this.router.post("/dev", AccountController.createNewAccountWithoutToken);
    // Route - /
    this.router.post("/", AccountController.createNewAccount);
    this.router.get("/", AccountController.getSingleAccount);
    this.router.delete("/", AccountController.deleteSingleAccount);
    // Route - /otp
    this.router.put("/otp", AccountController.generateOtp);
    // Route - /password
    this.router.put(
      "/password",
      AccountController.verifyOtp,
      AccountController.changePassword
    );
    // Route - /userid
    this.router.get(
      "/userid",
      AccountController.verifyOtp,
      AccountController.getUserId
    );
    // Route - /online
    this.router.put("/online", AccountController.changeOnlineStatus);
    // Route - /quicklinks
    this.router.put("/quicklinks", AccountController.updateQuickLinks);
    // Route - /auth
    this.router.post("/auth", AccountController.logIntoAccount);
    // Check: Add authentication
    this.router.patch(
      "/auth",
      Authentication.isLoggedIn,
      AccountController.logoutFromOneAccount
    );

    // Route - /auth/platform
    this.router.post(
      "/auth/platform",
      AccountController.createNewAccountUsingSocialMedia
    );
    this.router.put(
      "/auth/platform",
      AccountController.logIntoAccountUsingSocialMedia
    );

    // Route - /help
    this.router.get("/help", (req, res) => {
      res.status(200).send({
        status: "This route is working",
        data: [
          {
            method: "PUT",
            route: "/account/quicklinks?query={{user_id or email}}",
            desc: "Changes the quicklinks in the account",
            body: {
              quick_links: [
                {
                  text: "text for link (eg. manage applicants)",
                  url: "url for routing (eg. /manage/applicants)",
                },
              ],
            },
          },
          {
            method: "PUT",
            route:
              "/account/online?query={{user_id or email}}&is_online={{true or false}}",
            desc: "Changes account online status",
          },
          {
            method: "POST",
            route: "/account?type={{account_type}}",
            desc: "create new account, email sent",
            body: ["email"],
            info: {
              header: "send auth token for any type other than applicant",
            },
          },
          {
            NOTE: "ONLY FOR POSTMAN",
            method: "POST",
            route: "/account/dev?type={{account_type}}",
            desc: "create new account, email sent",
            body: ["email", "passkey"],
            info: {
              body: "passkey value 'EduversaDev@1'",
            },
          },
          {
            method: "GET",
            route: "/account/?query={{user_id or email}}",
            desc: "get single account",
          },
          {
            method: "PUT",
            route: "/account/otp?query={{user_id or email}}",
            desc: "creates new otp and sends to email",
          },
          {
            method: "PUT",
            route: "/account/password?query={{user_id or email}}&otp={{otp}}",
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
          {
            method: "GET",
            route: "/account/userid?query={{user_id or email}}&otp={{otp}}",
            desc: "sends the user id to the registered email",
          },
          {
            method: "POST",
            route: "/account/auth/platform?platform={{PLATFORM_NAME}}",
            desc: "creates new account and applicant profile using any social platform",
            body: "{{SESSION_OBJECT}}",
          },
          {
            method: "PUT",
            route: "/account/auth/platform?platform={{PLATFORM_NAME}}",
            desc: "logs into the account using any social platform",
            body: "{{SESSION_OBJECT}}",
          },
          {
            method: "DELETE",
            route: "/account/?query={{user_id or email}}",
            desc: "Deletes one account along with the relevant profile",
          },
        ],
      });
    });

    return this;
  }
}

module.exports = AccountRouter;
