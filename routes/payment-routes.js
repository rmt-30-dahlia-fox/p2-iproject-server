const router = require('express').Router()
const Controller = require('../controllers')
const {transactionAuthorization} = require('../middlewares/auths')


router.post('/stripe', Controller.paymentWithStripe)

module.exports = router