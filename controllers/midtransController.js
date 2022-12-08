const midtransClient = require('midtrans-client');
const nodeMailer = require('../helpers/nodemailer');
const { Payment, User } = require('../models');

// Create Snap API instance
class MidtransController {
  static async createHistory(req, res, next) {
    try {
      const { UserId, total_price } = req.body
      // console.log("------->", UserId, total_price);
      const payment_detail = await Payment.create({ UserId, total_price, status: 'Paid off' })
      // console.log('SEBELUM user', UserId);
      const user = await User.findByPk(UserId)
      await nodeMailer(user.email)
      // console.log('setelah nodemailer', user);
      res.status(201).json(payment_detail)
    } catch (error) {
      console.log(error);
      // res.status(500).json(error)
    }
  }
  static async getTokenMidtrans(req, res) {
    // console.log('MASUK MIDTRANS CONTROLLER', req.body.UserId, req.body.total_price);


    let orderId = new Date().getTime()
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY
    });

    let parameter = {
      "transaction_details": {
        "order_id": `ORDERID-${orderId}`,
        "gross_amount": req.body.total_price
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
      }
    };
    const { UserId, total_price } = req.body
    const payment_detail = await Payment.create({ UserId, total_price, status: 'Paid off' })
    await User.update({ account: 'premium' }, { where: { id: UserId } })

    snap.createTransaction(parameter)
      .then((transaction) => {

        let transactionToken = transaction.token;
        res.status(201).json({ transactionToken })
      })
    // .catch(err => {
    //   res.status(500).json({ error: err })
    // })
    // this.createHistory(req, res)
    // console.log(orderId);
  }

}

module.exports = MidtransController