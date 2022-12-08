const { comparePw } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Customer, Unit, Order } = require("../models");
const CUSTOMER_JWT_SECRET = process.env.CUSTOMER_JWT_SECRET;

class CustomerController {
  static async register(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        phoneNumber,
        identityType,
        identityNumber,
      } = req.body;
      const customer = await Customer.create({
        name,
        email,
        password,
        phoneNumber,
        identityType,
        identityNumber,
      });
      res.status(200).json({ id: customer.id, email: customer.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };

      const customer = await Customer.findOne({ where: { email } });
      if (!customer) throw { name: "invalid_login" };

      const checkPw = comparePw(password, customer.password);
      if (!checkPw) throw { name: "invalid_login" };

      const access_token = signToken({ id: customer.id }, CUSTOMER_JWT_SECRET);
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

  static async getAllOrders(req, res, next) {
    const CustomerId = req.user.id;
    try {
      const orders = await Order.findAll({
        where: {
          CustomerId,
        },
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
    const id = req.params.id;
    const CustomerId = req.user.id;
    try {
      const order = await Order.findAll({
        where: {
          CustomerId,
          id,
        },
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
      res.status(200).json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async postOrder(req, res, next) {
    try {
      const CustomerId = req.user.id;
      const status = "Pending";

      const {
        pickupLocation,
        pickupDate,
        pickupTime,
        returnLocation,
        returnDate,
        returnTime,
        UnitId
      } = req.body;

      const unit = await Unit.findByPk(UnitId);
      if (!unit) throw { name: "unit_not_found", unitId: id };

      

      // let dateDifference = new Date(returnDate) - new Date(pickupDate);

      const date1 = new Date(pickupDate);
      const date2 = new Date(returnDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalPrice = unit.price * diffDays;

      const order = await Order.create({
        pickupLocation,
        pickupDate,
        pickupTime,
        returnLocation,
        returnDate,
        returnTime,
        totalPrice,
        status,
        UnitId,
        CustomerId
      });

      res.status(200).json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrderById(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
