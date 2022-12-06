const customerController = require('../controllers/customerController');
const router = require('express').Router();

router.post('/register', customerController.registerAccount);
router.post('/login', customerController.loginAccount);

module.exports = router;