const router = require('express').Router()
const Controller = require('../controllers')
const {transactionAuthorization} = require('../middlewares/auths')


router.post('', Controller.addTransaction)

router.delete('/:transactionId', transactionAuthorization, Controller.deleteTransaction)

router.get('/pending', Controller.getPendingTransactionsByUserId)

router.get('/paid', Controller.getPaidTransactionsByUserId)

router.patch('/:transactionId', transactionAuthorization, Controller.changePaymentStatus)



module.exports = router