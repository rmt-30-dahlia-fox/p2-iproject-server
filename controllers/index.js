const axios = require("axios");
const {User, Hotel, Wishlist, Transaction, sequelize, City} = require('../models')
const {verifyHash} = require('../helpers/bcryptjs')
const {signToken} = require('../helpers/jwt')
const { Op } = require("sequelize");
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const StripeSecretKey = process.env.STRIPE_SECRET_KEY
const StripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(StripeSecretKey);
const nodemailer = require("nodemailer");

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

          const access_token = signToken(payload)

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
                phoneNumber: '1111',
                address: 'address'
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
        dateCheckOut,
      } = req.body.obj

      await Transaction.create({
        UserId: req.userInfo.id,
        name,
        paidStatus: false,
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
        dateCheckOut,
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

  

  // Transaction - get pending transactions
  static async getPendingTransactionsByUserId (req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Op.and]: [{ UserId: req.userInfo.id }, { paidStatus: false }]
        }
      })
      res.status(200).json(transactions)
    } catch(err) {
      next(err)
    }
  }

   // Transaction - get paid transactions
   static async getPaidTransactionsByUserId (req, res, next) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Op.and]: [{ UserId: req.userInfo.id }, { paidStatus: true }]
        }
      })

      res.status(200).json(transactions)
    } catch(err) {
      next(err)
    }
  }

   // Transaction - change payment status
   static async changePaymentStatus (req, res, next) {
    try {
      const {transactionId} = req.params

      const theSearchedTransaction = Transaction.findByPk(transactionId)
      if(!transactionId) throw ('Data not found')

      await Transaction.update({
        paidStatus: true
      }, {
        where: {
          id: transactionId
        }
      })

      // node mailer

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.OUTLOOK_USERNAME, // generated ethereal user
          pass: process.env.OUTLOOK_PASSWORD, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: 'Travel Alliance', // sender address
        to: req.userInfo.email, // list of receivers
        subject: "Success Payment", // Subject line
        text: `Your order on ${Transaction.name} has been paid. Enjoy your stay!`, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


      res.status(200).json(`You have succesfully paid for your stay in ${theSearchedTransaction.name}`)
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

      const product = await stripe.products.create({
        name: req.body.pendingTransaction.name,
        default_price_data: {
          unit_amount: Math.floor(req.body.pendingTransaction.totalPrice * 100),
          currency: 'usd',
        },
        expand: ['default_price'],
      });

      const randomNumber = Math.random()


      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product.default_price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/transaction/success?id=${req.body.pendingTransaction.id}&verification=${randomNumber}`,
        cancel_url: `http://localhost:5173/transaction`,
      });

      res.status(200).json({url: session.url, randomNumber})

    } catch (err) {
      next(err)
    }
  } 
  
  // city - get cities
  static async fetchCitiesData (req, res, next) {let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
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
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
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
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST,
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
                  dateCheckOut: date_checkout
                }
              })

              const finalData = processedData.slice(page*10-10, page*10)

              res.status(200).json({finalData, length: processedData.length})
            } else {
              throw('Data not found')
            }
            
        } catch (err) {
          next(err)
        }
  }


    

}

module.exports = Controller