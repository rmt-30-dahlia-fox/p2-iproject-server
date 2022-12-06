const Controller = require("../controllers/controller")

const router = require("express").Router()

router.get("/covid-data", Controller.getCovidData)

module.exports = router
