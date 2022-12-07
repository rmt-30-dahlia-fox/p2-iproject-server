const express = require("express");
const CustomerController = require("../controllers/customer");
const router = express.Router();

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.get("/units", CustomerController.getAllUnits);
router.get("/units/:id", CustomerController.getUnitById);

// router.use(Auth.admin)

router.get("/orders", CustomerController.getAllOrders);
router.get("/orders/:id", CustomerController.getOrderById);
router.delete("/orders/:id", CustomerController.deleteOrderById);

module.exports = router;
