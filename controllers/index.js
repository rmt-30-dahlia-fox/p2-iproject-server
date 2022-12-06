if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { User, Cart, OrderHistory } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "invalidLogin" };

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) throw { name: "invalidLogin" };

      const payload = {
        id: user.id,
      };
      const access_token = generateToken(payload);

      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
