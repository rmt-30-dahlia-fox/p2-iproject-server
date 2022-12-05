const {verifyToken} = require('../helpers/jwt')
const {User, Hotel, Wishlist, Transaction, sequelize} = require('../models')

const authentication = async(req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw('Invalid token')

        const payload = verifyToken(access_token)
        
        const theSearchedUser = await User.findByPk(payload.id)
        if(!theSearchedUser) throw ('Invalid token')

        req.userInfo = {
            id: theSearchedUser.id,
        }
        
        next()
    } catch (err) {
        next(err)
    }
}



const transactionAuthorization = async (req, res, next) => {
    try {
        
        const {transcationId} = req.params
        
        const theSearchedTransaction = await Transaction.findByPk(transcationId)
        if(!theSearchedTransaction) throw ('Data not found')
        

        if(theSearchedTransaction.UserId !== req.userInfo.id) throw ('Forbidden')
        next()

    } catch (err) {
        next(err)
    }

}

const wishlistAuthorization = async (req, res, next) => {
    try {
        
        const {wishlistId} = req.params
        
        const theSearchedWishlist = await Wishlist.findByPk(transcationId)
        if(!theSearchedWishlist) throw ('Data not found')
        

        if(theSearchedWishlist.UserId !== req.userInfo.id) throw ('Forbidden')
        next()

    } catch (err) {
        next(err)
    }

}


module.exports = {
    authentication,
    transactionAuthorization,
    wishlistAuthorization
}