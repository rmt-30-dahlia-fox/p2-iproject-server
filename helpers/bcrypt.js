const bcrypt = require('bcryptjs')

const hashPass = (pass) => bcrypt.hashSync(pass, 8)

const compareHash = (pass, hashed) => bcrypt.compareSync(pass, hashed)

module.exports = { hashPass, compareHash }