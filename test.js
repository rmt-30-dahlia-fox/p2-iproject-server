const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
  params: {
    sort_order: 'HDR',
    location_id: '3000035821',
    date_checkout: '2022-12-16',
    date_checkin: '2022-12-15',
    star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
    rooms_number: '1',
    amenities_ids: 'FINTRNT,FBRKFST'
  },
  headers: {
    'X-RapidAPI-Key': '9ed40945d0msh1e9f5455b127c43p106fb0jsnc9347ce3026a',
    'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});