if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const {hotelRouter, paymentRouter} = require('./routes')
const Controller = require('./controllers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// endpoints 
app.use('/hotels', hotelRouter)

app.use('/payments', paymentRouter)



// do not edit
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})