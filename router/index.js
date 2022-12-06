const usersPath = require('./users');
const router = require('express').Router()

router.use('/users', usersPath)

module.exports = router