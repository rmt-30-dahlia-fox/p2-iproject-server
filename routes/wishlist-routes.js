const router = require('express').Router()
const Controller = require('../controllers')

router.post('/addToWishlist', Controller.addToWishlist)

router.post('/deleteFromWishlist/:wishlistId', Controller.deleteFromWishlist)

router.get('', Controller.getWishlistsByUser)


module.exports = router