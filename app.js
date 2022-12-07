if (process.env.MODE_ENV !== "production") {
  require('dotenv').config()
}
const express = require('express');
// const catchError = require('./middlewares/error-handler');
const routes = require('./router');
const app = express()
const port = 3000;
var cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)

// app.use(catchError)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
module.exports = app;
