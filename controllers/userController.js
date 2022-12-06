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

      res.status(200).json({ access_token })
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      const newUser = await User.create({ username, email, password, role: "Admin", phoneNumber, address })
      res.status(201).json({ id: newUser.id, email: newUser.email }) //success create statusnya 201
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }

  static async userLoginGoogle(req, res, next) {

    // try {
    //   const google_token = req.headers.google_token
    //   const client = new OAuth2Client(CLIENT_ID)
    //   const ticket = await client.verifyIdToken({
    //     idToken: google_token,
    //     audience: CLIENT_ID,
    //   });
    //   const payload = ticket.getPayload();
    //   // Check if user already exist or not?
    //   const [user, created] = await User.findOrCreate({
    //     where: { email: payload.email },
    //     defaults: {
    //       email: payload.email,
    //       username: payload.name,
    //       password: 'google_user',
    //       role: 'Staff'
    //     },
    //     hooks: false
    //   });
    //   const access_token = encodeToken({ id: user.id })
    //   res.status(200).json({ access_token, username: user.username })
    // } catch (error) {
    //   next(error)
    // }
  }
}

module.exports = userControllers