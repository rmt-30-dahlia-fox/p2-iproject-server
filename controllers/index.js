const { compareHash, hashPass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Activity, Type, Difficulty, Like, Badge } = require('../models')

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

  static async showActivities(req, res, next) {
    try {
      const activities = await Activity.findAll({
        include: [ User, Type, Difficulty, Like ]
      })

      res.status(200).json({ data: activities })
    } catch (error) {
      next(error)
    }
  }

  static async showActivity(req, res, next) {
    try {
      const { activityId } = req.params

      const activity = await Activity.findByPk(activityId, {
        include: [ User, Type, Difficulty, Like ]
      })
      if(!activity) throw { message: 'Data is not found' }
      
      res.status(200).json({ activity })
    } catch (error) {
      next(error)
    }
  }

  static async showUsers(req, res, next) {
    try {
      const users = await User.findAll({
        order: [["star", "DESC"]],
        include: Badge
      })
      
      res.status(200).json({ data: users })
    } catch (error) {
      next(error)
    }
  }

  static async showActivitiesPerUser(req, res, next) {
    try {
      const { userId } = req.params

      const activities = await Activity.findAll({
        where: { UserId: userId },
        include: [ Type, Difficulty, Like ]
      }) 

      res.status(200).json({ data: activities })
    } catch (error) {
      next(error)
    }
  }

  static async showUser(req, res, next) {
    try {
      const { userId } = req.params
      
      const user = await User.findByPk(userId, {
        include: [ Badge ]
      })

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { userId } = req.params
      const { email, password, fullName, dateOfBirth, city, imageProfile } = req.body
      
      const data = {}
      if(email) data.email = email
      if(password) data.password = hashPass(password)
      if(fullName) data.fullName = fullName
      if(dateOfBirth) data.dateOfBirth = dateOfBirth
      if(city) data.city = city
      if(imageProfile) data.imageProfile = imageProfile
      
      await User.update(data, { where: { id: userId } })
      
      res.status(200).json({ message: `User ${userId} has been updated` })
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