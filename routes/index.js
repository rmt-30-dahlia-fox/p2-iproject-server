const router = require('express').Router();
const employeeRouter = require('./employeeRouter');


router.use('/employees', employeeRouter);


module.exports = router;