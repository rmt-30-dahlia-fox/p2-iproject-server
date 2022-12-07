const Controller = require("../controllers/controller")

const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.get("/covid-data", Controller.getCovidData)
router.post("/userDetail", Controller.postUserDetail)
// router.get("/userDetail", Controller.getUserDetail)
// router.put("/userDetail", Controller.updateUserDetail)

// router.get("/drugs", Controller.getDrugs)
// router.post("/drugs", Controller.postDrugs)
// router.put("/drugs", Controller.updateDrugs)

// router.post("/symptomes", Controller.postSymtomes)

// router.get("/diseases", Controller.getDiseases)
// router.post("/diseases", Controller.postDiseases)
// router.put("/diseases", Controller.updateDiseases)
// router.patch("/diseases", Controller.patchDiseases)
module.exports = router
