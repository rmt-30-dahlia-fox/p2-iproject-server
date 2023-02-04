const express = require("express");
const Controller = require("../Controller/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.post("/google-sign-in", Controller.handleGoogleSignIn);
router.post("/uploads", upload.single("gambar"), Controller.uploadFile);
router.use(authentication);
router.get("/doctors", Controller.showDoctors);
router.get("/doctors/:id", Controller.getDoctorById);
router.post("/doctors", Controller.createDoctor);
router.patch("/doctors/:id", Controller.changeDoctorStatus);
router.put("/doctors/:id", Controller.editDoctorProfile);
router.post("/medicines", Controller.addMedicine);
router.get("/medicines", Controller.showAllMedicine);
router.get("/prescriptions", Controller.showAllPrescription);
router.get("/prescriptions/:id", Controller.showPrescriptionById);
router.patch("/prescriptions/:id", Controller.changePrescriptionStatus);
router.get("/doctor-prescriptions", Controller.showPrescriptionToDoctor);
router.post("/prescriptions/:medicineId", Controller.addPrescription);
router.get("/medicalRecords", Controller.showImageFile);
router.post(
  "/generate-midtrans-token/:prescriptionId",
  Controller.generateMidtrans
);

router.use(errorHandler);
module.exports = router;
