const { hashPassword, verifyPassword } = require("../helpers/bycript");
const { generateToken, verifyToken } = require("../helpers/jwt");
const { User, Doctor } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "Invalid email/password" };
      const checkPassword = verifyPassword(password, findUser.password);
      if (!checkPassword) throw { name: "Invalid email/password" };
      const payload = {
        id: findUser.id,
        email: findUser.email,
      };
      const access_token = generateToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({ username, email, password, role });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
  static async showDoctors(req, res, next) {
    try {
      const showDoctors = await Doctor.findAll();
      res.status(200).json(showDoctors);
    } catch (err) {
      next(err);
    }
  }
  static async createDoctor(req, res, next) {
    try {
      const { name, sip_number, gender, photoUrl, specialization, status } =
        req.body;
      const UserId = req.user.id;
      const newDoctor = await Doctor.create({
        name,
        sip_number,
        gender,
        photoUrl,
        specialization,
        status: "active",
        UserId,
      });
      res.status(201).json(newDoctor);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
