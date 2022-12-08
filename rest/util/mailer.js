"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 486,
  auth: {
  }
});

const sendMail = async (recipientEmail) => {
  // send mail with defined transport object
  return transporter.sendMail({
    from: `"Satelit 🛰" <frs18840@gmail.com>`, // sender address
    to: `${recipientEmail}`, // list of receivers
    subject: "Welcome to Satelit 🛰", // Subject line
    text: "Welcome", // plain text body
    html: "<b>Welcome to Satelit 🛰!! A place to share and chat with your friends! Thank you for trusting us. Enjoy your time!!</b>", // html body
  });
}

module.exports = {
  sendMail,
}
