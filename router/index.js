const Controller = require('../controllers')
const router = require('express').Router()

router.post('/login', Controller.userLogin)

module.exports = router