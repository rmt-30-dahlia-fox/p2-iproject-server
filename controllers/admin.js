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

  static async login(req, res, next) {}
}

module.exports = AdminController;
