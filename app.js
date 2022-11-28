const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Controller = require('./controllers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/hotels', Controller.fetchHotels)



// do not edit
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})