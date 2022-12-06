const customerController = require('../controllers/customerController');
const router = require('express').Router();

router.post('/register', customerController.registerAccount);
router.post('/login', customerController.loginAccount);
router.get('/products', customerController.getAllProducts);
router.get('/dealers', customerController.getAllDealers);
router.get('/products/:carId', customerController.getProductDetail);

module.exports = router;