const router = require('express').Router()
const userRouter = require('./user-routes')
const paymentRouter = require('./payment-routes')
const hotelRouter = require('./hotel-routes')



app.use('/hotels', hotelRouter)

app.use('/payments', paymentRouter)


module.exports = router