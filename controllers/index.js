const axios = require("axios");
const {User, Hotel, Wishlist, Transaction, sequelize, City} = require('../models')
const {verifyHash} = require('../helpers/bcryptjs')
const {signToken} = require('../helpers/jwt')
const { Op } = require("sequelize");
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class Controller {

    // User - register
    static async register (req, res, next) {
      try {
          const {email, password, phoneNumber, address} = req.body
          let username

          if(email) username = req.body.username || email.slice(0,email.lastIndexOf('@'))

         const newUser = await User.create({username, email, password, phoneNumber, address})

         res.status(201).json({message: `User with email ${newUser.email} has just been created`})
      } catch (err) {
          next(err)
      }
    }

    // User - login
    static async login (req, res, next) {
      try {
          const {email, password} = req.body

          const theSearchedUser = await User.findOne({where: {email}})
          if(!theSearchedUser) throw ('Invalid email/password')

          const isValidPassword = verifyHash(password, theSearchedUser.password)
          if(!isValidPassword) throw ('Invalid email/password')

          const payload = {
              id: theSearchedUser.id
          }

          const access_token = generateToken(payload)

          res.status(200).json({access_token})

      } catch (err) {
          next (err)
      }
    }

    // User - Google sign-in
    static async googleLogin (req, res, next) {
      try {
          const token = req.headers['google-oauth-token']

          // verify google
          const ticket = await client.verifyIdToken({
              idToken: token,
              audience: process.env.CLIENT_ID  
          });

          const {email, name} = ticket.getPayload();
          const [user, created] = await User.findOrCreate({
              where: { email },
              defaults: {
                username: name,
                email,
                password: 'google',
              },
              hooks: false
          });
          
          const payload = {
              id: user.id
          }

          const access_token = signToken(payload)

          res.status(200).json({access_token, username: user.username})
      } catch (err) {
          next(err)
      }
  }

  // Transaction - add hotel to transaction
  static async addTransaction (req, res, next) {
    try {

      const {
        name,
        paidStatus,
        quantity,
        totalPrice,
        star,
        address,
        imageUrl,
        rating,
        totalReviews,
        price,
        features,
        roomLeft,
        freeCancelPolicy,
        city,
        dateCheckIn,
        dateCheckout,
      } = req.body

      await Transaction.create({
        name,
        paidStatus,
        quantity,
        totalPrice,
        star,
        address,
        imageUrl,
        rating,
        totalReviews,
        price,
        features,
        roomLeft,
        freeCancelPolicy,
        city,
        dateCheckIn,
        dateCheckout,
      })

      res.status(201).json(`${name} has been added to your transaction list`)
    } catch(err) {
      next(err)
    }
  }

  // Transaction - delete hotel to transaction
  static async deleteTransaction (req, res, next) {
    try {
      const {transactionId} = req.params

      const theSearchedTransaction = await Transaction.findByPk(transactionId)
      if(!theSearchedTransaction) throw ('Data not found') 

      await Transaction.destroy({
        where: {
          id: transactionId
        }
      })

      res.status(200).json(`${theSearchedTransaction.name} has been removed from your transaction list`)

    } catch(err) {
      next(err)
    }
  }

  // Transaction - get transactions
  static async getTransactionsByUserId (req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          UserId: req.userInfo.id
        }
      })

      res.status(200).json(transactions)
    } catch(err) {
      next(err)
    }
  }

  // Wishlist - add hotel to wishlist
  static async addToWishlist (req, res, next) {
    try {
      const {
        name,
        star,
        address,
        imageUrl,
        rating,
        totalReviews,
        price,
        features,
        roomLeft,
        freeCancelPolicy,
        city,
        dateCheckIn,
        dateCheckout,
      } = req.body

      await Wishlist.create({
        name,
        star,
        address,
        imageUrl,
        rating,
        totalReviews,
        price,
        features,
        roomLeft,
        freeCancelPolicy,
        city,
        dateCheckIn,
        dateCheckout,
      })

      res.status(201).json(`${name} has been added to your wishlist`)
    } catch(err) {
      next(err)
    }
  }

  // Wishlist - delete hotel from wishlist
  static async deleteFromWishlist (req, res, next) {
    try {
      const {wishlistId} = req.params

      const theSearchedWishlist = await Wishlist.findByPk(wishlistId)
      if(!theSearchedWishlist) throw ('Data not found') 

      await Wishlist.destroy({
        where: {
          id: wishlistId
        }
      })

      res.status(200).json(`${theSearchedWishlist.name} has been removed from your transaction list`)

    } catch(err) {
      next(err)
    }
  }

  // Wishlist - get wishlists
  static async getWishlistsByUser (req, res, next) {
    try {
      const wishlists = Wishlist.findAll({
        where: {
          UserId: req.userInfo.id
        }
      })
    } catch(err) {
      next(err)
    }
  }


  // payment - stripe
  static async paymentWithStripe (req, res, next) {
    try {
      const {stripeTokenId, items} = req.body
    } catch (err) {
      next(err)
    }
  } 
  
  // city - get cities
  static async fetchCitiesData (req, res, next) {
    try {


      const cities = await City.findAll({
        order: [['name']]
      })
      
      res.status(200).json(cities)
    
    } catch (err) {
      next(err)
    }
  } 

  // hotel - get hotel's details
  static async getHotelById (req, res, next) {
    try {
      const {id} = req.params

      const theSearchedHotel = await Hotel.findByPk(id)
      if(!theSearchedHotel) throw ('Data not found')
      
      res.status(200).json(theSearchedHotel)
      

    } catch (err) {
      next(err)
    }
  }  

  // hotels - fetch hotels data
  static async fetchHotelData (req, res, next) {
        try {

          const {page, city, date_checkout, date_checkin, star_rating_ids, rooms_number} = req.query

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
            if(data.length === 0) throw ('Data not found')
            const location_id = data[0].id

            const optionsHotel = {
              method: 'GET',
              url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
              params: {
                sort_order: 'STAR',
                location_id,
                date_checkout,
                date_checkin,
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
            
            if(response.data.hotels.length > 0) {
              const processedData = response.data.hotels.filter(el => 
                el.name &&
                el.ratesSummary.minPrice &&
                el.hotelFeatures.hotelAmenityCodes &&
                el.totalReviewCount > 50
              ).map(el => {
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
                  dateCheckIn: date_checkin,
                  dateCheckout: date_checkout
                }
              })
              console.log(page, processedData.length)
              const finalData = processedData.slice(page*10-10, page*10)

              res.status(200).json({finalData, length: processedData.length})
            } else {
              throw('Data not found')
            }
            
        } catch (err) {
          console.log(err)
        }
  }


    

}

module.exports = Controller