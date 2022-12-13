const nodemailer = require('nodemailer')
const pass = process.env.PASS_NODEMAILER

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 486,
  auth: {
    user: 'ersakantibelva@gmail.com',
    pass
  }
});

module.exports = { transporter };