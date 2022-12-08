const router = require("express").Router();
const movieRouter = require("./movies");
const bookmarkRouter = require("./bookmark");
const paymentRouter = require("./payment");
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post('/login/google', Controller.loginGoogle);

router.use("/movies", movieRouter);

router.use(authentication);

router.use("/payment", paymentRouter);
router.use("/bookmark", bookmarkRouter);

module.exports = router;
