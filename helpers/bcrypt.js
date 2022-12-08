const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, 7)
}

function comparePassword(password, hasedPassword) {
  return bcrypt.compareSync(password, hasedPassword)
}

module.exports = { hashPassword, comparePassword }