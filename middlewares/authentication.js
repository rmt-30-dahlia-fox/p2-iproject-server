const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

// async function doctorConsent(req, res, next) {
//   try {
//     const { access_token } = req.headers
//     if (!access_token) {
//       throw { name: "invalid token" }
//     }

//     const payload = verifyToken(access_token)
//     const user = await Doctor.findByPk(payload.id)
//     if (!user) {
//       throw { name: "invalid token" }
//     }

//     req.user = {
//       id: user.id,
//       role: user.role,
//     }

//     next()
//   } catch (error) {
//     next(error)
//   }
// }

async function userConsent(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "invalid token" }
    }

    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)
    if (!user) {
      throw { name: "invalid token" }
    }

    req.user = {
      id: user.id,
      role: user.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { userConsent }
