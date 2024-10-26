const Mail = require("../config/nodemailer.config");
const { TemplateReader } = require("./templatereader.helper");

class MailSender {
  static UserIdPasswordMail = class extends Mail {
    setContent({ user_id, password }) {
      const html = TemplateReader.accountCrdedentialsTemplate()
        .replace("{{USER_ID}}", user_id)
        .replace("{{PASSWORD}}", password);

      this.setHtml(html);
      return this;
    }
  };
}

module.exports = MailSender;
