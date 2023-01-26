if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const Controller = require('./controllers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// endpoints 
app.use(routes)

// errorHandler
app.use(errorHandler)

// do not edit
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})