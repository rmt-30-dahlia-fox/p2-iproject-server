const Controller = require('../controllers')
const router = require('express').Router()

router.post('/login', Controller.userLogin)

router.get('/activities', Controller.showActivities)
router.get('/activities/:activityId', Controller.showActivity)

router.get('/users/:userId/activities', Controller.showActivityPerUser)

module.exports = router