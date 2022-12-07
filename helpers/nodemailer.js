const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const nodeMailer = async (email) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'tigjum.abc@gmail.com', // generated ethereal user
      pass: 'cqmzcdpvykvenjsv', // generated ethereal pas	sword
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hacktiv Shop" <hacktiv@shop.com>', // sender address
    to: email, // list of receivers
    subject: "Thank You ✔", // Subject line
    text: "Thank You! Your Purchase is confirmed", // plain text body
    html: "<b>You are now subscribed into My Diet web app as a premium user</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
module.exports = nodeMailer

