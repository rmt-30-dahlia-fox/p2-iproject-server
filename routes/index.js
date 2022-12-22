const router = require('express').Router();
const employeeRouter = require('./employeeRouter');
const customerRouter = require('./customerRouter');

router.use('/employees', employeeRouter);
router.use('/customers', customerRouter);

module.exports = router;