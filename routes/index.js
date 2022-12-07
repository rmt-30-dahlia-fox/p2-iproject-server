const router = require('express').Router()
const Controller = require('../controllers/controller')
const Authentication = require('../middlewares/authentication')

router.post('/login', Controller.postLogin)

router.use(Authentication)
router.post('/register', Controller.postRegister)

module.exports = router