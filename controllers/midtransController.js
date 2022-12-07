const midtransClient = require('midtrans-client');
const { Payment } = require('../models');

// Create Snap API instance
class MidtransController {
  static async getTokenMidtrans(req, res) {
    // console.log('MASUK MIDTRANS CONTROLLER');
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

    snap.createTransaction(parameter)
      .then((transaction) => {

        let transactionToken = transaction.token;
        console.log({ transactionToken });
        res.status(201).json({ transactionToken })
      })

    console.log(orderId);
  }
  static async createHistory(req, res, next) {
    try {
      const { UserId, total_price } = req.body
      const payment_detail = await Payment.create({ UserId, total_price, status: 'Paid off' })
      res.status(201).json(payment_detail)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = MidtransController