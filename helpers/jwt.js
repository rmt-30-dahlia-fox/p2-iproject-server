const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_CREDENTIAL // ini biar kunci kita aman tidak terlihat dari segi code

function encodeToken(payload) {
  // ini buat ngubah payload bentukkanya object ke encryption JWT
  return jwt.sign(payload, SECRET)
}

function decodeToken(token) {
  // ini buat ngubah encryption JWT ke bentukan payload awal
  return jwt.verify(token, SECRET)
}

module.exports = { encodeToken, decodeToken }