const router = require('expres').Router()
const Controller = require('../controllers')

router.get('', Controller.fetchHotelData)

module.exports = router