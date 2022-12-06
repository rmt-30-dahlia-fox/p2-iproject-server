const axios = require("axios")
class Controller {
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
      const { data } = await axios({
        
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Controller
