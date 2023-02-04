const express = require("express");
const router = express.Router();

const adminRouter = require('./admin');
const customerRouter = require('./customer');

router.use('/admin', adminRouter)
router.use('/customer', customerRouter)

module.exports = router;
