const Controller = require('../controllers')
const router = require('express').Router()

router.post('/login', Controller.userLogin)

router.get('/activities', Controller.showActivities)
router.get('/activities/:activityId', Controller.showActivity)
router.get('/activities/:userId/users', Controller.showActivitiesPerUser)

router.get('/users', Controller.showUsers)
router.put('/users/:userId', Controller.updateUser)

module.exports = router