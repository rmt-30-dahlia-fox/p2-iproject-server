const axios = require("axios")
const { comparePassword } = require("../helpers/bcyrpt")
const { signToken } = require("../helpers/jwt")
const { User, Favorite } = require("../models")

/* Register & Login */
class Controller {
  static async userRegsiter(req, res, next) {
    try {
      const { email, password } = req.body
      const User = await User.create({ email, password })

      res.status(201).json(User)
    } catch (error) {
      next(error)
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "invalidLogin" }

      const findUser = await User.findOne({ where: { email } })

      if (!findUser) throw { name: "invalidLogin" }

      const validPassword = comparePassword(password, findUser.password)
      if (!validPassword) throw { name: "invalidLogin" }

      const payload = { id: findUser.id }

      const access_token = signToken(payload)

      res.status(200).json({ access_token, message: `Logged in as ${email}` })
    } catch (error) {
      next(error)
    }
  }

  /* Add Favorites */
  static async addFavorites(req, res, next) {
    try {
      const { title, description, urlToImage } = req.body
      const UserId = req.user.id
      const addFavorites = await Favorite.create({
        title,
        description,
        urlToImage,
        UserId,
      })

      res
        .status(201)
        .json({ message: `Success add Favorite to list ${addFavorites.title}` })
    } catch (error) {
      next(error)
    }
  }

  static async findFavorites(req, res, next) {
    try {
      const { id } = req.user

      const options = {}

      options.where = {
        UserId: id,
      }
      options.include = [
        {
          model: Food,
        },
      ]

      const FavoritesList = await Favorites.findAll(options)
      res.status(200).json({ FavoritesList: FavoritesList })
    } catch (error) {
      next(error)
    }
  }
 static async deleteFavorites(req, res, next) {
    try {
      const { id } = req.params.id

      const deleteFavorites = await Favorites.destroy({ where: { id: id } })

      if (deleteFavorites === 0) throw { name: "Data not found", table: "Favorites" }

      res.status(200).json({ message: "Successfully delete food from Favorites" })
    } catch (error) {
      next(error)
    }
  }

  /* Get Data from database */

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
}
/* UserDetail */

module.exports = Controller
