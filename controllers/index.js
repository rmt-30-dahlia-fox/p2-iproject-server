const axios = require("axios");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

class Controller {

    static async fetchHotelData (req, res, next) {
          try {

            const {city, date_checkout, date_checkin, star_rating_ids, rooms_number} = req.body
            if(star_rating_ids) optionsHotel.params.star_rating_ids = star_rating_ids
            if(rooms_number) optionsHotel.params.rooms_number = rooms_number

            const optionsLocation = {
              method: 'GET',
              url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations',
              params: {name: 'Jakarta', search_type: 'CITY'},
              headers: {
                'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
              }
            };            
            const {data} = await axios(optionsLocation)
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
            const response =  await axios(optionsHotel)


            const finalData = response.data.hotels.map(el => {
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
                freeCancelPolicy: el.ratesSummary.freeCancelableRateAvail
              }
            })

            res.status(200).json(finalData)


          } catch (err) {
            console.log('masuk error')
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