const Controller = require('../controllers')
const router = require('express').Router()

router.post('/login', Controller.userLogin)
router.get('/activities', Controller.showActivities)
router.get('/activities/:id', Controller.showActivity)

module.exports = router