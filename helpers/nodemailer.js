const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "josh.natanael9@gmail.com",
    pass: "qumgtqxorxuotfvi"
  }
})

const email = {
  from: "josh.natanael9@gmail.com",
  subject: "Invoice CarStore"
}


module.exports = {transporter, email};