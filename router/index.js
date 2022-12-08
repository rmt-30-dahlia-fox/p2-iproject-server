const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')
const { upload } = require('../helpers/multer')

const router = require('express').Router()

router.post('/register', Controller.register)
router.post('/login', Controller.userLogin)

router.use(authentication)

router.get('/activities', Controller.showActivities)
router.post('/activities', upload.single("imageActivity"), Controller.addActivity)
router.get('/activities/:activityId', Controller.showActivity)
router.get('/activities/:userId/users', Authorization.authUser, Controller.showActivitiesPerUser)

router.get('/users', Controller.showUsers)
router.get('/users/:userId', Authorization.authUser, Controller.showUser)
router.put('/users/:userId', Authorization.authUser, upload.single("imageProfile"), Controller.updateUser)

router.get('/exercises', Controller.showExercises)

router.get('/types', Controller.showTypes)
router.get('/difficulties', Controller.showDifficulties)

router.post('/likes/:activityId', Controller.addLike)
router.delete('/likes/:activityId', Authorization.authUnlike, Controller.deleteLike)

module.exports = router