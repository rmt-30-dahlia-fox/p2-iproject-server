const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignin);

router.use(authentication);

router.get("/cart", Controller.cart);
router.get("/order-history", Controller.orderHistory);
router.post("/pay", Controller.pay);
router.post("/cart", Controller.addCart);
router.post("/midtrans", Controller.midtrans);
router.post("/convert", Controller.convert);
router.delete("/cart/:id", Controller.deleteCart);

module.exports = router;
