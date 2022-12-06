const { decodeToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers

    if (!access_token) throw { name: "Invalid Token" }
    const payload = decodeToken(access_token)

    const isUser = await User.findByPk(payload.id)

    if (!isUser) throw { name: "Invalid Token" }
    req.user = { id: isUser.id }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication