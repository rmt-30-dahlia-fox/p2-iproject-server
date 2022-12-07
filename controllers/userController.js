const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/jwt');

class userControllers {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email: email } })

      if (!user) {
        throw { name: 'Invalid Login' }
      } else if (!comparePassword(password, user.password)) {
        throw { name: 'Invalid Login' }
      }
      const payload = { id: user.id }
      const access_token = encodeToken(payload)

      res.status(200).json({ access_token, id: user.id })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNum, address } = req.body
      const newUser = await User.create({ username, email, password, account: 'normal', phoneNum, address })
      res.status(201).json({ id: newUser.id, email: newUser.email }) //success create statusnya 201
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findByPk(req.body.id)
    } catch (error) {
      res.status(404).json(error)
    }
  }
}

module.exports = userControllers