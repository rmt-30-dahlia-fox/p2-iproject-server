const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

const authentication = (async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if(!access_token) throw { message: 'Invalid token' }

    const payload = verifyToken(access_token)

    const user = await User.findByPk(payload.id)
    if(!user) throw { message: 'Invalid token' }
    
    req.user = {
      id: payload.id
    }

    next()
  } catch (error) {
    next(error)
  }
})

module.exports = authentication