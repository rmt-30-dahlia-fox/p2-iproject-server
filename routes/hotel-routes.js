const router = require('express').Router()
const Controller = require('../controllers')

router.get('', Controller.fetchHotelData)

router.get('/:id', Controller.getHotelById)

module.exports = router