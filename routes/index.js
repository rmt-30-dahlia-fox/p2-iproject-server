const router = require('express').Router()
const Controller = require('../controllers/controller')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/login', Controller.postLogin)
router.get('/products', Controller.filterPaginatedProducts)
router.get('/categories', Controller.getCategories)

router.use(Authentication)
router.post('/register', Authorization.register, Controller.postRegister)
router.post('/members', Controller.postMember)

router.get('/transactions', Controller.openTransaction)
router.post('/transactions', Controller.closeTransaction)
router.post('/carts', Controller.postCart)
router.get('/carts/:transactionId', Controller.getCarts)
router.delete('/carts/:id', Controller.deleteCart)
// Later

router.patch('/carts/:id', Controller.patchCart)
router.get('/members', Controller.getMember)
router.get('/refresh', Controller.refreshReport)
router.post('/orders', Controller.postOrder)
router.post('/reports/daily', Controller.callDailyReport)
router.post('/reports/monthly', Controller.callMonthlyReport)


module.exports = router