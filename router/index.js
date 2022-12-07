const express = require("express");
const Controller = require("../Controller/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.post("/login", Controller.login);
router.post("/register", Controller.register);
router.use(authentication);
router.get("/doctors", Controller.showDoctors);

router.use(errorHandler);
module.exports = router;
