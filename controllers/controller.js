const axios = require("axios")
const { User, Favorites } = require("../models")

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.create({ email, password })

      res
        .status(200)
        .json({ message: `Successfully created new User with email : ${email}` })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "invalid Login" }
      const user = await User.findOne({
        where: { email },
      })

      if (user && user.role !== "Customer") throw { name: "Forbidden" }

      if (!user) throw { name: "invalid Login" }
      const validPassword = Bcyrpt.comparePassword(password, user.password)
      if (!validPassword) throw { name: "invalid Login" }
      const payload = {
        id: user.id,
      }

      const access_token = generateToken(payload)

      res.status(200).json({ access_token, message: `Logged in as : ${email}` })
    } catch (error) {
      next(error)
    }
  }

  static async findUserById(req, res, next) {
    const { id } = req.user
    try {
      const findUser = await User.findByPk(id)
      res.status(200).json({ message: "find User : ", findUser })
    } catch (error) {
      next(error)
    }
  }

  /* Add Edit Delete Favorites */
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

  static async createFavorites(req, res, next) {
    try {
      const { foodId } = req.params
      const { id } = req.user
      const findFood = await Food.findByPk(foodId)
      if (!findFood) {
        throw { name: "Data not found", table: "Food" }
      }

      const options = {
        where: {
          UserId: id,
          FoodId: foodId,
        },
      }
      const [foodData, created] = await Favorites.findOrCreate(options)

      if (!created) {
        throw { name: "alreadyExist" }
      }

      res.status(201).json({
        Favorites: `Food with name ${findFood.name} successfully added to Favorites`,
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteFavorites(req, res, next) {
    try {
      const { foodId } = req.params

      const deleteFavorites = await Favorites.destroy({
        where: { FoodId: foodId },
      })

      if (deleteFavorites === 0) throw { name: "Data not found", table: "Favorites" }

      res.status(200).json({ message: "Successfully delete food from Favorites" })
    } catch (error) {
      next(error)
    }
  }

  /* API's */
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

/* milih sandbox, development. */

module.exports = Controller
