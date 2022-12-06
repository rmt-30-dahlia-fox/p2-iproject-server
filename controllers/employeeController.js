const {Car, Dealer} = require('../models');

class employeeController{
  static async addCar(req, res, next){
    try {
      const {name, imgUrl, price, description, specification, brand} = req.body;
      const newCar = await Car.create(
        {name, imgUrl, price, description, specification, brand}
      )
      res.status(201).json(newCar)
    } catch (error) {
      next(error);
    }
  }
  static async addDealer(req, res, next){
    try {
      const {name, address, city, phoneNumber} = req.body;
      const newDealer = await Dealer.create(
        {name, address, city, phoneNumber}
      )
      res.status(201).json(newDealer);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = employeeController;