const employeeController = require("../controllers/employeeController");
const router = require('express').Router();

router.post('/cars', employeeController.addCar);
router.post('/dealers', employeeController.addDealer);

module.exports = router;