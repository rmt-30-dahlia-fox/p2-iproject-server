const Controllers = require('../controllers')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()


router.post('/login', Controllers.login)
router.post('/register', Controllers.register )
router.get('/mangas', Controllers.showMangaList)
router.get('/mangas/:id', Controllers.showMangaDetail)

router.use(authentication)


  module.exports = router