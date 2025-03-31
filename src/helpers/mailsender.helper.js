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
  static AccountDeletionMail = class extends Mail {
    setContent({ user_id }) {
      const html = TemplateReader.accountDeletionTemplate().replace(
        "{{USER_ID}}",
        user_id
      );
      this.setHtml(html);
      return this;
    }
  };

  static UserIdRetreiveMail = class extends Mail {
    setContent({ user_id }) {
      const html = TemplateReader.userIdTemplate().replace(
        "{{USER_ID}}",
        user_id
      );
      this.setHtml(html);
      return this;
    }
  };

  static OtpMail = class extends Mail {
    setContent({ otp }) {
      const html = TemplateReader.otpTemplate()
        .replace("{{OTP}}", otp)
        .replace("{{DATE}}", new Date().toLocaleDateString());
      this.setHtml(html);
      return this;
    }
  };
}

module.exports = MailSender;
