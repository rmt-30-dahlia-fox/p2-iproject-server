const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const encode = (payload) => {
    return jwt.sign(payload, JWT_SECRET)
}

const decode = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {encode, decode}