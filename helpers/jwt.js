const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const createToken = (payload) => jwt.sign(payload, secretKey)

const verifyToken = (token) => jwt.verify(token, secretKey)

module.exports = { createToken, verifyToken }