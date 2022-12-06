const { verifyToken } = require("../helpers");
const {User} = require('../models')

const authentication = async (req,res,next)=>{
    try {
        const {access_token} = req.headers;
        if(!access_token){
            throw ({name: "invalid token"})
        }
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)
        
        if(!user){
            throw {name : "invalid token"}
        }

        req.user = {
            id: user.id,
            role: user.role
        }
        
        next()
    } catch (err) {
        next(err)
    }  

}


module.exports = authentication