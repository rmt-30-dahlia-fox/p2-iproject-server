const jwt = require('jsonwebtoken');

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

function decodeToken(token, secret) {
  return jwt.verify(token, secret)
}

module.exports = { signToken, decodeToken }