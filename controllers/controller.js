const axios = require("axios")
const {User, Appointment ,Consultation ,Disease ,Drug ,Symptome ,UserDetail} = require("../models")

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.create({ email, password })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
    } catch (error) {
      next(error)
    }
  }

  static async getCovidData(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://data.covid19.go.id/public/api/prov.json",
        method: "GET",
      })
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  static async postUserDetail(req, res, next) {
    try {
      const { name, gender, birthday, telephone, height, weight, eyeColor, address } =
        req.body
      const UserId = req.user.id
      const userData = await UserDetail.create({
        name,
        gender,
        birthday,
        telephone,
        height,
        weight,
        eyeColor,
        address,
        UserId,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

/* milih sandbox, development. */

module.exports = Controller
