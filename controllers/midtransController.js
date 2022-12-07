const midtransClient = require('midtrans-client');


// Create Snap API instance
class MidtransController {
  static async getTokenMidtrans(req, res) {
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
}

module.exports = MidtransController