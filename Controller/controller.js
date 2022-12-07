const { hashPassword, verifyPassword } = require("../helpers/bycript");
const { generateToken, verifyToken } = require("../helpers/jwt");
const { User, Doctor, Medicine, Prescriptions } = require("../models");

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
  static async getDoctorById(req, res, next) {
    try {
      const { id } = req.params;
      const findDoctor = await Doctor.findByPk(id);
      if (!findDoctor) throw { name: "Doctor not found" };
      res.status(200).json(findDoctor);
    } catch (err) {
      next(err);
    }
  }
  static async changeDoctorStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Doctor.update({ status }, { where: { id } });
      res.status(200).json({ message: "Succes updated status" });
    } catch (err) {
      next(err);
    }
  }
  static async editDoctorProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { name, sip_number, gender, photoUrl, specialization, status } =
        req.body;
      await Doctor.update(
        { name, sip_number, gender, photoUrl, specialization, status },
        { where: { id } }
      );
      res.status(200).json({ message: "Succes updated doctor" });
    } catch (err) {
      next(err);
    }
  }
  static async addMedicine(req, res, next) {
    try {
      const { name, amount, dose, photoUrl } = req.body;
      const newMedicine = await Medicine.create({
        name,
        amount,
        dose,
        photoUrl,
      });
      res.status(201).json(newMedicine);
    } catch (err) {
      next(err);
    }
  }
  static async showAllMedicine(req, res, next) {
    try {
      const showMedicines = await Medicine.findAll();
      res.status(200).json(showMedicines);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
