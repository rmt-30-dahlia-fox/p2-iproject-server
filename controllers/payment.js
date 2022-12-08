const midtransClient = require("midtrans-client");
const { User } = require("../models");
const nodemailer = require("nodemailer");

class Controller {
  static async paymentGetway(req, res, next) {
    try {
      const { amount } = req.body;
      const { id } = req.user;

      const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-n3hd9vhiqeeev3J7FAyRIdf1",
        clientKey: "SB-Mid-client-T5eH1T_FUBGIvyNT",
      });

      const findUser = await User.findByPk(id);

      const parameter = {
        transaction_details: {
          order_id:
            "order-id-" +
            Math.round(new Date().getTime() / 1000) +
            "-" +
            Math.round(Math.random() * 100),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: findUser.username,
          email: findUser.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      const transactionToken = transaction.token;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 486,
        auth: {
          user: 'bobby.notokoesoemo@gmail.com',
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const mailOptions = {
        from: "bobby.notokoesoemo@gmail.com",
        to: findUser.email,
        // to: "bobby.notokoesoemo@gmail.com",
        subject: "Transaction notification",
        text: `Hello, ${findUser.username}. You have made a donation to Movie Library. Thank you!`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({ message: "error sending mail" });
        }
      });

      res.status(200).json({ transactionToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
