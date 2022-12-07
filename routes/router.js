const Controller = require("../controllers/controller")

const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.get("/covid-data", Controller.getCovidData)
router.post("/userDetail", Controller.postUserDetail)

module.exports = router
