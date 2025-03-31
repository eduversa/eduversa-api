const fs = require("fs");
class TemplateReader {
  static basePath = __dirname + "/../templates/";
  static accountCrdedentialsTemplate() {
    return fs.readFileSync(this.basePath + "accountCredentials.html", "utf-8");
  }
  static accountDeletionTemplate() {
    return fs.readFileSync(this.basePath + "accountDeletion.html", "utf-8");
  }
  static userIdTemplate() {
    return fs.readFileSync(this.basePath + "userid.html", "utf-8");
  }
  static otpTemplate() {
    return fs.readFileSync(this.basePath + "otp.html", "utf-8");
  }
}
module.exports = { TemplateReader };
