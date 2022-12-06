const router = require('express').Router()
const Controller = require('../controllers')

router.post('/addTransaction', Controller.addTransaction)

router.post('/deleteTransaction/:transactionId', Controller.deleteTransaction)

router.get('', Controller.addTransaction)


module.exports = router