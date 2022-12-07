const {User} = require('../models')
const { decode } = require('../helpers/jwt')

const auth = async(req, res, next) => {
    try{
        const {access_token} = req.headers
        if(!access_token){
            throw {name: 'invalidToken'}
        }
        const payload = decode(access_token)
        
        const user = await User.findByPk(payload.id)
        if(!user){
            throw {name: 'invalidToken'}
        }

        req.user = {
            id: user.id,
            email: user.email
        }

        next()
    } catch (err) {
      next(err)
    }
}

module.exports = auth