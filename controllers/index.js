const axios = require("axios");
const {User, Hotel, Wishlist, Transaction, sequelize} = require('../models')
const {verifyHash} = require('../helpers/bcryptjs')
const {signToken} = require('../helpers/jwt')

class Controller {

    static async fetchHotelData (req, res, next) {
          try {

            const {city, date_checkout, date_checkin, star_rating_ids, rooms_number} = req.body

            const hotels = await Hotel.findAll({
              where: {
                city
              }
            })
            
            if(hotels.length > 10) res.status(200).json(hotels)
            else {
            
              const optionsLocation = {
                method: 'GET',
                url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
                params: {name: city, search_type: 'CITY'},
                headers: {
                  'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
                  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
                }
              };            
              const {data} = await axios(optionsLocation) // fetch location id
              const location_id = data[0].id

              const optionsHotel = {
                method: 'GET',
                url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
                params: {
                  sort_order: 'STAR',
                  location_id,
                  date_checkout: '2022-12-16',
                  date_checkin: '2022-12-15',
                },
                headers: {
                  'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
                  'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                  'Accept-Encoding': 'application/json'
                }
              };
              if(star_rating_ids) optionsHotel.params.star_rating_ids = star_rating_ids
              if(rooms_number) optionsHotel.params.rooms_number = rooms_number


              const response =  await axios(optionsHotel) // fetch hotels


              const finalData = response.data.hotels.map(el => { // select choosen keys to be inserted
                if(el.hotelFeatures.hotelAmenityCodes) {
                  return {
                    name: el.name,
                    star: el.starRating,
                    address: `${el.location.address.addressLine1}, ${el.location.address.cityName}, ${el.location.address.countryName}, ${el.location.address.zip}`,
                    imageUrl: el.thumbnailUrl,
                    rating: el.overallGuestRating,
                    totalReviews: el.totalReviewCount,
                    price: el.ratesSummary.minPrice,
                    features: el.hotelFeatures.hotelAmenityCodes.toString(),
                    roomLeft: el.ratesSummary.roomLeft,
                    freeCancelPolicy: el.ratesSummary.freeCancelableRateAvail,
                    city,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                } else {
                  return {
                    name: el.name,
                    star: el.starRating,
                    address: `${el.location.address.addressLine1}, ${el.location.address.cityName}, ${el.location.address.countryName}, ${el.location.address.zip}`,
                    imageUrl: el.thumbnailUrl,
                    rating: el.overallGuestRating,
                    totalReviews: el.totalReviewCount,
                    price: el.ratesSummary.minPrice,
                    features: '',
                    roomLeft: el.ratesSummary.roomLeft,
                    freeCancelPolicy: el.ratesSummary.freeCancelableRateAvail,
                    city,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                }
                
                
              })

              await sequelize.queryInterface.bulkInsert('Hotels', finalData)

              res.status(200).json(finalData)
            }

            


          } catch (err) {
            console.log(err)
          }

    }


    static async paymentWithStripe (req, res, next) {
      try {
        const {stripeTokenId, items} = req.body
      } catch (err) {
        next(err)
      }
    }

}

module.exports = Controller