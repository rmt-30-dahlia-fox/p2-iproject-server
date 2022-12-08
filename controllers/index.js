if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { User, Cart, OrderHistory } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

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

  static async googleSignin(req, res, next) {
    try {
      const googleToken = req.headers["google-oauth-token"];
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: "google",
        },
        hooks: false,
      });

      const payload = {
        id: user.id,
      };

      const access_token = generateToken(payload);

      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async cart(req, res, next) {
    try {
      const cards = await Cart.findAll({
        order: [["id", "ASC"]],
        include: [User],
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json({ cards });
    } catch (error) {
      next(error);
    }
  }

  static async addCart(req, res, next) {
    try {
      const { name, img, level, price } = req.body;

      await Cart.create({
        UserId: req.user.id,
        name,
        img,
        level,
        price,
      });

      res.status(200).json({ message: `Card successfully add to Shopping Cart` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id } = req.params;
      await Cart.destroy({
        where: {
          UserId: req.user.id,
          id,
        },
      });

      res.status(200).json({ message: `Card successfully remove from Shopping Cart` });
    } catch (error) {
      next(error);
    }
  }

  static async orderHistory(req, res, next) {
    try {
      const orders = await OrderHistory.findAll({
        order: [["id", "ASC"]],
        include: [User],
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static async pay(req, res, next) {
    try {
      const { name, img, level, price } = req.body;

      await Cart.create({
        UserId: req.user.id,
        name,
        img,
        level,
        price,
      });
      res.status(200).json({ message: `Payment Success` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
