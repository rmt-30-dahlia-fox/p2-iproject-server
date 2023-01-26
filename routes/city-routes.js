const router = require('express').Router()
const Controller = require('../controllers')


router.get('', Controller.fetchCitiesData)

module.exports = router