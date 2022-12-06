const customerController = require('../controllers/customerController');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.post('/register', customerController.registerAccount);
router.post('/login', customerController.loginAccount);
router.get('/products', customerController.getAllProducts);
router.get('/dealers', customerController.getAllDealers);
router.get('/products/:carId', customerController.getProductDetail);
router.use(authentication);
router.get('/users', customerController.getUserDetail);
router.get('/transactions/:status', customerController.getTransactionsByUser);
router.post('/transactions/:carId', customerController.bookTransaction);

module.exports = router;