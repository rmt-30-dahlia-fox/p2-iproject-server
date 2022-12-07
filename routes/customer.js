const express = require("express");
const CustomerController = require("../controllers/customer");
const Auth = require('../middlewares/authentication');
const router = express.Router();

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.get("/units", CustomerController.getAllUnits);
router.get("/units/:id", CustomerController.getUnitById);

router.use(Auth.customer)

router.get("/orders", CustomerController.getAllOrders);
router.get("/orders/:id", CustomerController.getOrderById)
router.post("/orders/:unitId", CustomerController.postOrder)
router.delete("/orders/:id", CustomerController.deleteOrderById)

module.exports = router;