const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.post('/login', Controller.userLogin)

router.use(authentication)

router.get('/activities', Controller.showActivities)
router.get('/activities/:activityId', Controller.showActivity)
router.get('/activities/:userId/users', Controller.showActivitiesPerUser)

router.get('/users', Controller.showUsers)
router.put('/users/:userId', Controller.updateUser)

module.exports = router