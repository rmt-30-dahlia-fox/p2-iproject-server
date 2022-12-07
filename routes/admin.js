const express = require("express");
const AdminController = require("../controllers/admin");
const router = express.Router();

router.post("/register", AdminController.register);
router.post("/login", AdminController.login);

router.get("/units", AdminController.getAllUnits);
router.post("/units", AdminController.addUnit);
router.get("/units/:id", AdminController.getUnitById);
router.put("/units/:id", AdminController.updateUnitById);
router.delete("/units/:id", AdminController.deleteUnitById);

router.get("/orders", AdminController.getAllOrders);
router.get("/orders/:id", AdminController.getOrderById)
router.patch("/orders/:id", AdminController.updateOrderStatus);
router.delete("/orders/:id", AdminController.deleteOrderById)

module.exports = router;
