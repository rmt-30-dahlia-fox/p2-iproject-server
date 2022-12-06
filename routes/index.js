const express = require("express");
const router = express.Router();

const adminRouter = require('./admin');
const unitRouter = require('./unit');
const customerRouter = require('./customer');
const orderRouter = require('./order');

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "hello world" });
});

router.use('/admin', adminRouter)
router.use('/units', unitRouter)
router.use('/orders', orderRouter)
router.use('/customer', customerRouter)

module.exports = router;
