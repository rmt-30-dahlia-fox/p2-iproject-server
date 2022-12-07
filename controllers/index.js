const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models')

class Controller {
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body
      if(!email) throw { message: 'Email is required' }
      if(!password) throw { message: 'Password is required' }

      const user = await User.findOne({ where: { email } })
      if(!user) throw { message: 'Invalid email/password' }

      const valid = compareHash(password, user.password)
      if(!valid) throw { message: 'Invalid email/password' }

      const access_token = createToken({ id: user.id })

      res.status(201).json({ access_token, userId: user.id })
    } catch (error) {
      next(error)
    }
  }

  static async nama(req, res, next) {
    try {
      
      res.status(200).json("ok")
    } catch (error) {
      next(error)
    }
  }

  static async nama(req, res, next) {
    try {
      
      res.status(200).json("ok")
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller