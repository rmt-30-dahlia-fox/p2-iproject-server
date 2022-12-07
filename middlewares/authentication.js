const { decodeToken } = require("../helpers/jwt");
const { Admin } = require("../models");
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
const CUSTOMER_JWT_SECRET = process.env.CUSTOMER_JWT_SECRET

class Auth {
  static async admin(req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) throw { name: "invalid_token" };

      const payload = decodeToken(access_token, ADMIN_JWT_SECRET);
      if (!access_token) throw { name: "invalid_token" };

      const user = await Admin.findByPk(payload.id);
      if (!user) throw { name: "invalid_token" };

      req.user = { id: user.id };
      next();

    } catch (err) {
      next(err);
    }
  }

  static async customer(req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) throw { name: "invalid_token" };

      const payload = decodeToken(access_token, CUSTOMER_JWT_SECRET);
      if (!access_token) throw { name: "invalid_token" };

      const user = await Customer.findByPk(payload.id);
      if (!user) throw { name: "invalid_token" };

      req.user = { id: user.id };
      next();

    } catch (err) {
      next(err);
    }
  }
}

module.exports = Auth
