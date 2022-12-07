const { comparePw } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin } = require("../models");

class AdminController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.create({ email, password });
      res.status(201).json({ id: admin.id, email: admin.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };

      const admin = await Admin.findOne({ where: { email } });
      if (!admin) throw { name: "invalid_login" };
      const checkPw = comparePw(password, admin.password)
      if (!checkPw) throw { name: "invalid_login" };
      
      const access_token = signToken({ id: admin.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
