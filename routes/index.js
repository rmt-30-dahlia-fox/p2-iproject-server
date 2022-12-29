const router = require('express').Router()
const {authentication} = require('../middlewares/auths')

const userRouter = require('./user-routes')
const transactionRouter = require('./transaction-routes')
const paymentRouter = require('./payment-routes')
const cityRouter = require('./city-routes')
const hotelRouter = require('./hotel-routes')


router.use('/users', userRouter)

router.use('/cities', cityRouter)
router.use('/hotels', hotelRouter)

router.use(authentication)
router.use('/transactions', transactionRouter)


router.use('/payments', paymentRouter)





module.exports = router