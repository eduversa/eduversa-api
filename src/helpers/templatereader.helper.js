const fs = require("fs");
class TemplateReader {
  static basePath = __dirname + "/../templates/";
  static accountCrdedentialsTemplate() {
    return fs.readFileSync(this.basePath + "accountCredentials.html", "utf-8");
  }
}
module.exports = { TemplateReader };
