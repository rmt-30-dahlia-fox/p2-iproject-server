const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {User, Car, Dealer, Transaction, Review} = require('../models');
const { Op } = require("sequelize");
const axios = require('axios');

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
  static async getUserDetail(req, res, next){
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  }
  static async getTransactionsByUser(req, res, next){
    try {
      const status = req.params.status;
      let options = {
        order: [
          ["createdAt", "ASC"]
        ],
        where: {
          UserId: req.user.id
        },
        include: [Car, Review, {
          model: User,
          attributes: ["firstName", "lastName"]
        }]
      };
      if(status === "Paid"){
        options.where = {
          ...options.where,
          status
        }
      }
      const transactions = await Transaction.findAll(options);
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
  static async bookTransaction(req, res, next){
    try {
      const carId = req.params.carId;
      const car = await Car.findByPk(carId);
      if(!car){
        throw("notFound")
      }
      const transaction = await Transaction.create({
        UserId: req.user.id,
        CarId: carId,
        status: "Pending"
      })
      res.status(200).json(transaction)
    } catch (error) {
      next(error);
    }
  }
  static async postReview(req, res, next){
    try {
      const transactionId = req.params.transactionId;
      const {message} = req.body;
      const transaction = await Transaction.findByPk(transactionId);
      const review = await Review.create({
        UserId: transaction.UserId,
        CarId: transaction.CarId,
        message,
        TransactionId: transaction.id
      })
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }
  static async updateBookStatus(req, res, next){
    try {
      const transactionId = req.params.transactionId;
      const {status} = req.body;
      await Transaction.update(
        {
          status
        },
        {
          where: {
            id: transactionId
          }
        }
      )
      res.status(200).json({message: "Successfully updated status"});
    } catch (error) {
      next(error);
    }
  }
  static async updateProfile(req, res, next){
    try {
      const {firstName, lastName, email, password, phoneNumber} = req.body;
      let data = { firstName, lastName, email, phoneNumber }
      if(password){
        data = {
          ...data,
          password: hashPassword(password)
        }
      }
      await User.update(
        data, {
        where: {
          id: req.user.id
        }
      });
      res.status(200).json({message: "Successfully updated profile"})
    } catch (error) {
      next(error);
    }
  }
  static getPaymentData(req, res, next){
    const user = req.body;
    axios({
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA").toString("base64")
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "order-csb-" + new Date().getTime(),
            gross_amount: 5000000
          },
          credit_card: {
            secure: true
          },
          customer_details: user
        }
    }).then( snapResponse => { 
        let snapToken = snapResponse.data.token;
        res.status(200).json({snapToken})
      })
      .catch(err=>{
        next(err);
      })
  }
}

module.exports = customerController;