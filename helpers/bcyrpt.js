const bcrypt = require("bcryptjs")

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(8)
  var hash = bcrypt.hashSync(password, salt)

  return hash
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, comparePassword }
