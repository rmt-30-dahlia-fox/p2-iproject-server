const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePass } = require("../helpers/bcrypt");
const { OAuth2Client } = require('google-auth-library');

class Controller {
  static async register(req, res, next) {
    try {
      const { body } = req;

      const register = await User.create(body);

      res.status(201).json({ message: "Success register with email " + register.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const login = await User.findOne({ where: { email } });

      if (!login) throw { name: "Invalid email or password" };
      if (!comparePass(password, login.password))
        throw { name: "Invalid email or password" };

      const payload = {
        id: login.id
      }

      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
        const CLIENT_ID = process.env.CLIENT_ID;
        const { google_token } = req.headers;
        const client = new OAuth2Client(CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: CLIENT_ID
        });

        const { name, email } = ticket.getPayload();

        const [user, create] = await User.findOrCreate({
            where: { email },
            defaults: {
                username: name,
                email,
                password: email,
            },
            hooks: false
        })

        res.status(200).json({
            "message": `User ${user.email} found`,
            "access_token": signToken({
                id: user.id
            }),
            "user": {
                "name": user.username
            }
        })
    } catch (error) {
        next(error);
    }
  }
}

module.exports = Controller;
