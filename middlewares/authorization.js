const { User } = require('../models')

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
}

module.exports = Authorization