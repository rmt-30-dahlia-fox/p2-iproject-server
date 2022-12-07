const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/login', Controller.postLogin)

module.exports = router