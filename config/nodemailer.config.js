const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');


const transporter = nodemailer.createTransport(new SMTPTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
  },
}));


const sendEmail = (mailOptions)=>{
    // console.log(process.env.SENDER_EMAIL)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            // console.log(info)
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports = {sendEmail}