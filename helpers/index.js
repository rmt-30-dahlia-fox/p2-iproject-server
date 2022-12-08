const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = 'test'

const hashPassword= (pw)=> bcrypt.hashSync(pw, 8)
const comparePassword = (pw,hashed)=> bcrypt.compareSync(pw, hashed)

const signToken = (payload)=> jwt.sign(payload, SECRET)
const verifyToken = (access_token)=> jwt.verify(access_token, SECRET)

module.exports = {
    hashPassword,
    comparePassword,
    signToken,
    verifyToken
}