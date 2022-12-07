const router = require('express').Router()
const Controller = require('../controllers/controller')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/login', Controller.postLogin)

router.use(Authentication)
router.post('/register', Authorization.register, Controller.postRegister)

module.exports = router