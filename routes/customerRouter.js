const customerController = require('../controllers/customerController');
const authentication = require('../middlewares/authentication');
const { transactionAuthorization } = require('../middlewares/authorization');
const router = require('express').Router();

router.post('/register', customerController.registerAccount);
router.post('/login', customerController.loginAccount);
router.post('/google/login', customerController.customerGoogleSignIn);
router.get('/products', customerController.getAllProducts);
router.get('/dealers', customerController.getAllDealers);
router.get('/products/:carId', customerController.getProductDetail);
router.use(authentication);
router.get('/users', customerController.getUserDetail);
router.get('/transactions/:status', customerController.getTransactionsByUser);
router.post('/transactions/:carId', customerController.bookTransaction);
router.post('/reviews/:transactionId', transactionAuthorization, customerController.postReview);
router.patch('/transactions/:transactionId', transactionAuthorization, customerController.updateBookStatus);
router.put('/users', customerController.updateProfile);
router.post('/payments', customerController.getPaymentData);

module.exports = router;