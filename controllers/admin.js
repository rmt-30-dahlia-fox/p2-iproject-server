const { comparePw } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin, Unit, Order } = require("../models");

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
      const checkPw = comparePw(password, admin.password);
      if (!checkPw) throw { name: "invalid_login" };

      const access_token = signToken({ id: admin.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUnits(req, res, next) {
    try {
      const units = await Unit.findAll({
        attributes: ["id", "model", "type", "price", "imageUrl"],
      });
      res.status(200).json({ units });
    } catch (err) {
      next(err);
    }
  }

  static async addUnit(req, res, next) {
    try {
      const { model, type, price, imageUrl } = req.body;
      const unit = await Unit.create({ model, type, price, imageUrl });
      res.status(201).json({ message: `Unit with id ${unit.id} created` });
    } catch (err) {
      next(err);
    }
  }

  static async getUnitById(req, res, next) {
    try {
      const id = req.params.id;
      const unit = await Unit.findByPk(id, {
        attributes: ["id", "model", "type", "price", "imageUrl"],
      });
      res.status(200).json({ unit });
    } catch (err) {
      next(err);
    }
  }

  static async updateUnitById(req, res, next) {
    try {
      const id = req.params.id;
      const { model, type, price, imageUrl } = req.body;
      const unit = await Unit.findByPk(id, {
        attributes: ["id", "model", "type", "price", "imageUrl"],
      });
      if (!unit) throw { name: "unit_not_found", unitId: id };
      await Unit.update({ model, type, price, imageUrl }, { where: { id } });
      res.status(200).json({ message: `Unit with id ${unit.id} updated!` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUnitById(req, res, next) {
    try {
      const id = req.params.id;
      const unit = await Unit.findByPk(id, {
        attributes: ["id", "model", "type", "price", "imageUrl"],
      });
      if (!unit) throw { name: "unit_not_found", unitId: id };
      await Unit.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Unit with id ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  }

  static async getAllOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        attributes: [
          "id",
          "pickupLocation",
          "pickupDate",
          "returnLocation",
          "returnDate",
          "totalPrice",
          "status",
          "CustomerId",
          "UnitId",
        ],
      });
      res.status(200).json({ orders });
    } catch (err) {
      next(err);
    }
  }

  static async getOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const order = await Order.findByPk(id, {
        attributes: [
          "id",
          "pickupLocation",
          "pickupDate",
          "returnLocation",
          "returnDate",
          "totalPrice",
          "status",
          "CustomerId",
          "UnitId",
        ],
      });
      if (!order) throw { name: "order_not_found", orderId: id };
      res.status(200).json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async updateOrderStatus(req, res, next) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const order = await Order.findByPk(id);
      if (!order) throw { name: "order_not_found", orderId: id };
      await Order.update({ status }, { where: { id } });
      res.status(200).json({ message: `Order with id ${id} updated!` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const order = await Order.findByPk(id);
      if (!order) throw { name: "order_not_found", orderId: id };

      await Order.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `Order with id ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;