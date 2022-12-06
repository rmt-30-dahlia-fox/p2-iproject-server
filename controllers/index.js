const { comparePassword, signToken } = require('../helpers')
const {User,Manga,WantToRead} = require('../models')




class Controllers{
    static async login(req,res,next){
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'data not found', message: 'invalid email or password' }
            const validPassword = comparePassword(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'invalid email or password' }

            const access_token = signToken({
                id: user.id
            })

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const {  email, password} = req.body

            const newUser = await User.create({ email, password})

            const payload = {
                id: newUser.id
            }

            const access_token = signToken(payload)

            res.status(201).json({
                id: newUser.id, email: newUser.email, access_token
            })
        } catch (error) {
            next(error)
        }
    }




}



module.exports = Controllers