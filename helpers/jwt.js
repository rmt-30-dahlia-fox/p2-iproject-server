const jwt = require('jsonwebtoken')

const encode = (payload) => {
    return jwt.sign(payload, "SILENT")
}

const decode = (token) => {
    return jwt.verify(token, "SILENT")
}

module.exports = {encode, decode}