const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

class Token {
    static generate = (payload) => {
        return jwt.sign(payload, key)
    }
    
    static verify = (token) => {
        return jwt.verify(token, key)
    }

}

module.exports = Token;