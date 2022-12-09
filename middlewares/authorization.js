const { Order } = require("../models");

module.exports = class Authz {
  static async customer(req, res, next) {
    try {
      const id = req.params.id;
      const UserId = req.user.id;

      const order = await Order.findByPk(id);
      if (!order) throw { name: "order_not_found" };
      if (order.UserId !== UserId) throw { name: "forbidden" };

      next();
    } catch (err) {
      next(err);
    }
  }
};
