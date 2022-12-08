const MidtransController = require('../controllers/midtransController');
const usersPath = require('./users');
const router = require('express').Router()

router.use('/users', usersPath)

router.post('/payment', MidtransController.getTokenMidtrans)
router.post('/create-payment', MidtransController.createHistory)

module.exports = router