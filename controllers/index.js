const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Activity, Type, Difficulty } = require('../models')

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

      res.status(201).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async showActivities(req, res, next) {
    try {
      const activities = await Activity.findAll({
        include: [ User, Type, Difficulty ]
      })

      res.status(200).json({ activities })
    } catch (error) {
      next(error)
    }
  }

  static async showActivity(req, res, next) {
    try {
      const { id } = req.params

      const activity = await Activity.findByPk(id, {
        include: [ User, Type, Difficulty ]
      })
      if(!activity) throw { message: 'Data is not found' }
      
      res.status(200).json({ activity })
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