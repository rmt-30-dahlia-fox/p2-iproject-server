const { Transaction, Car } = require('../models');

async function transactionAuthorization(req, res, next) {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findOne({
      where: {
        id: transactionId
      }
    })
    if (!transaction) {
      throw ("notFound")
    }
    if(transaction.UserId !== req.user.id){
      throw("forbidden")
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { transactionAuthorization };