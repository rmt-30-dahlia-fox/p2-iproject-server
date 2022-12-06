const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {User, Car, Dealer, Transaction, Review} = require('../models');
const { Op } = require("sequelize");

class customerController{
  static async registerAccount(req, res, next){
    try {
      const {firstName, lastName, email, password, phoneNumber} = req.body;
      const newUser = await User.create(
        {firstName, lastName, email, password, phoneNumber}
      )
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      })
    } catch (error) {
      next(error);
    }
  }
  static async loginAccount(req, res, next){
    try {
      const {email, password} = req.body;
      if(!email){
        throw("noEmail")
      }
      if(!password){
        throw("noPassword")
      }
      const user = await User.findOne({
        where: {
          email
        }
      })
      if(!user){
        throw("invalid")
      }
      const isValidPassword = comparePassword(password, user.password);
      if(!isValidPassword){
        throw("invalid");
      }
      const payload = {
        id: user.id
      }
      res.status(200).json({access_token: generateToken(payload)})
    } catch (error) {
      next(error);
    }
  }
  static async getAllProducts(req, res, next){
    try {
      const brand = req.query.brand;
      const price = +req.query.price;
      let options = {
        order: [
          ['id', 'ASC']
        ]
      }
      if(brand){
        options.where = {
          brand
        }
      }
      if(price){
        let lowerValue;
        let upperValue;
        if(price === 1){
          lowerValue = 0;
          upperValue = 250000000;
        }
        else if(price === 2){
          lowerValue = 250000000;
          upperValue = 500000000;
        }
        else if(price === 3){
          lowerValue = 500000000;
          upperValue = 750000000;
        }
        else if(price === 4){
          lowerValue = 750000000;
          upperValue = Number.MAX_VALUE
        }
        options.where = {
          ...options.where,
          price: {
            [Op.gt]: lowerValue,
            [Op.lte]: upperValue
          }
        }
      }
      const cars = await Car.findAll(options);
      res.status(200).json(cars)
    } catch (error) {
      next(error);
    }
  }
  static async getAllDealers(req, res, next){
    try {
      const dealers = await Dealer.findAll({
        order: [
          ["id", "ASC"]
        ]
      });
      res.status(200).json(dealers);
    } catch (error) {
      next(error);
    }
  }
  static async getProductDetail(req, res,next){
    try {
      const carId = req.params.carId;
      const car = await Car.findOne({
        where: {
          id: carId
        },
        include: {
          model: Review,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"]
            }
          ]
        },
        order: [
          ["id", "ASC"]
        ]
      });
      if(!car){
        throw("notFound");
      }
      res.status(200).json(car)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;