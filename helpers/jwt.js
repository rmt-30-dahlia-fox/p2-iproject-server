const jwt = require("jsonwebtoken")
const key = process.env.SECRET_KEY

const signToken = (payload) => jwt.sign(payload, key)
const verifyToken = (token) => jwt.verify(token, key)

module.exports = {
    signToken,
    verifyToken
}
