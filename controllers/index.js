const axios = require("axios");

class Controller {

    static async fetchHotels (req, res, next) {
          try {
            console.log('sini dulu')
            const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
                params: {
                  checkout_date: '2022-12-01',
                  units: 'metric',
                  dest_id: '-553173',
                  dest_type: 'city',
                  locale: 'en-gb',
                  adults_number: '2',
                  order_by: 'popularity',
                  filter_by_currency: 'AED',
                  checkin_date: '2022-11-30',
                  room_number: '1',
                  children_number: '2',
                  page_number: '0',
                  children_ages: '5,0',
                  categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                  include_adjacency: 'true'
                },
                headers: {
                  'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
                  'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
              };
            
            const response = await axios(options)
            console.log('success')
            res.json(response.data)


          } catch (err) {
            console.log('masuk error')
            console.log(err)
          }

    }

}

module.exports = Controller