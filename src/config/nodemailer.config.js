const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

const transporter = nodemailer.createTransport(
  new SMTPTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  })
);

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log(info)
      console.log("Email sent: " + info.response);
    }
  });
};

class Mail {
  from = process.env.GMAIL_EMAIL;
  to = null;
  subject = null;
  html = null;

  constructor() {}

  setDestinationEmail(email) {
    this.to = email;
    return this;
  }
  setSubject(subject) {
    this.subject = subject;
    return this;
  }
  setHtml(html) {
    this.html = html;
    return html;
  }
  setContent() {
    throw new Error("Method Implementation Not Found");
  }
  send = () => {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.html,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(info.envelope);
      }
    });
  };
  //   sendMailWithHtml = () => {
  //     const mailOptions = {
  //       from: this.from,
  //       to: this.to,
  //       subject: this.subject,
  //       html: this.content,
  //     };
  //     transporter.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log(info);
  //         console.log("Email sent: " + info.response);
  //       }
  //     });
  //   };
}

module.exports = Mail;
