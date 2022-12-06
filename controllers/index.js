const { User, Cart, OrderHistory } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = await User.create({ email, password });

      res.status(201).json({ message: `user with email ${newUser.email} has been created` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
