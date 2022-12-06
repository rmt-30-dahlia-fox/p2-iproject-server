const router = require('express').Router()

const userRouter = require('./user-routes')

const paymentRouter = require('./payment-routes')
const hotelRouter = require('./hotel-routes')


router.use('/users', userRouter)

router.use('/hotels', hotelRouter)



router.use('/payments', paymentRouter)





module.exports = router