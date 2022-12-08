const { User, Activity, Like } = require('../models')

class Authorization {
  static async authUser(req, res, next) {
    try {
      const { userId } = req.params

      const user = await User.findByPk(userId)
      if(!user) throw { message: 'Data is not found' }

      if(user.id != req.user.id) throw { message: 'You are not authorized' }

      next()
    } catch (error) {
      next(error)
    }
  }

  static async authUnlike(req, res, next) {
    try {
      const { activityId } = req.params
      const { id } = req.user

      const likes = await Like.findAll({
        where: { ActivityId: activityId }
      })

      if(!likes) throw { message: 'Data is not found' }
      if(!likes.some(el => el.UserId == id)) {
        throw { message: 'Data is not found' }
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Authorization