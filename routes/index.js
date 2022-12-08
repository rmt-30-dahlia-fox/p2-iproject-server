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
router.post('/carts', Controller.postCart)
router.get('/carts/:transactionId', Controller.getCarts)
router.patch('/carts/:id', Controller.patchCart)
router.delete('/carts/:id', Controller.deleteCart)
router.get('/members', Controller.getMember)
router.post('/transactions', Controller.closeTransaction)
router.get('/refresh', Controller.refreshReport)


module.exports = router