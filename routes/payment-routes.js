const router = require('express').Router()
const Controller = require('../controllers')

router.get('/stripe', Controller.paymentWithStripe)

module.exports = router