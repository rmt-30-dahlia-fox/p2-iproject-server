const router = require('express').Router()
const Controller = require('../controllers')
const auth  = require('../middlewares/auth')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(auth)

router.get('/players', Controller.getPlayers)
router.post('/myplayers/:playerId', Controller.addMyPlayer)
router.get('/myplayers', Controller.getMyPlayers)
router.get('/myplayers/:myplayerId', Controller.getMyPlayerById)
router.delete('/myplayers/:myplayerId', Controller.deleteMyPlayer)

module.exports = router