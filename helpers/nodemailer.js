const nodemailer = require('nodemailer');
const PASSWORD_NODEMAILER = process.env.PASSWORD_NODEMAILER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "carstoreproject@gmail.com",
    pass: PASSWORD_NODEMAILER
  }
})

const email = {
  from: "carstoreproject@gmail.com",
  subject: "Invoice CarStore"
}


module.exports = {transporter, email};