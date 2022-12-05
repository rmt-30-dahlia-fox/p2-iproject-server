const router = require('express').Router()
const Controller = require('../controllers')

router.get('', Controller.fetchHotelData)

module.exports = router