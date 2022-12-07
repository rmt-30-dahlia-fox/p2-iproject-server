const Controller = require('../controllers')
const router = require('express').Router()

router.post('/login', Controller.userLogin)
router.get('/activities', Controller.showActivities)

module.exports = router