const {WantToRead} = require('../models')

const authorization = async(req,res,next)=>{
    try {
        const {id} = req.params
        const list = await WantToRead.findByPk(id)
        if(!list){
            throw {name: '404data not found' , message : 'Manga not found'}  
        }

        if(req.user.id != list.UserId){
            throw {name: 'forbidden'}    
        }
        
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorization