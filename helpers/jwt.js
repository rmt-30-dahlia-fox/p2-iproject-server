const jwt = require("jsonwebtoken")

function signToken(payload) {
  return jwt.sign(payload, "KEYLESS")
}

function verifyToken(token) {
  return jwt.verify(token, "KEYLESS")
}

module.exports = { signToken, verifyToken }
