const express = require("express");
const Controller = require("../Controller/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.use(authentication);
router.get("/doctors", Controller.showDoctors);
router.post("/doctors", Controller.createDoctor);
router.get("/doctors/:id", Controller.getDoctorById);
router.patch("/doctors/:id", Controller.changeDoctorStatus);
router.put("/doctors/:id", Controller.editDoctorProfile);
router.post("/medicines", Controller.addMedicine);
router.get("/medicines", Controller.showAllMedicine);
router.get("/prescriptions", Controller.showAllPrescription);
router.post("/prescriptions/:medicineId", Controller.addPrescription);

router.use(errorHandler);
module.exports = router;
