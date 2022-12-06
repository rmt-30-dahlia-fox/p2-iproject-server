const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {User, Car, Dealer, Transaction, Review} = require('../models');

class customerController{
  static async registerAccount(req, res, next){
    try {
      const {firstName, lastName, email, password, phoneNumber} = req.body;
      const newUser = await User.create(
        {firstName, lastName, email, password, phoneNumber}
      )
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      })
    } catch (error) {
      next(error);
    }
  }
  static async loginAccount(req, res, next){
    try {
      const {email, password} = req.body;
      if(!email){
        throw("noEmail")
      }
      if(!password){
        throw("noPassword")
      }
      const user = await User.findOne({
        where: {
          email
        }
      })
      if(!user){
        throw("invalid")
      }
      const isValidPassword = comparePassword(password, user.password);
      if(!isValidPassword){
        throw("invalid");
      }
      const payload = {
        id: user.id
      }
      res.status(200).json({access_token: generateToken(payload)})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;