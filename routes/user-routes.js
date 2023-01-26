const router = require('express').Router()
const Controller = require('../controllers')


router.post('/register', Controller.register)

router.post('/login', Controller.login)

router.post('/google-login', Controller.googleLogin)


module.exports = router