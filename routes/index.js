const Controllers = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = require('express').Router()


router.post('/login', Controllers.login)
router.post('/register', Controllers.register )
router.get('/mangas', Controllers.showMangaList)
router.get('/mangas/:id', Controllers.showMangaDetail)
router.post('/google-sign-in', Controllers.handleGoogleSignIn)


router.use(authentication)

router.get('/wantToRead', Controllers.showWantToRead)
router.post('/wantToRead', Controllers.createWantToRead)
router.delete('/wantToRead/:id',authorization, Controllers.deleteWantToRead)
router.patch('/wantToRead/:id',authorization, Controllers.deleteWantToRead)

  module.exports = router