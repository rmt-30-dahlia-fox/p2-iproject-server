const Controllers = require('../controllers')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()


router.post('/login', Controllers.login)
router.post('/register', Controllers.register )

router.use(authentication)


  module.exports = router