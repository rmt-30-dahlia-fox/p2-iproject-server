const { default: axios } = require('axios')
const { comparePassword, signToken } = require('../helpers')
const { User, Manga, WantToRead } = require('../models')




class Controllers {
    static async login(req, res, next) {
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
            const { email, password } = req.body

            const newUser = await User.create({ email, password })

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

    static async showMangaList(req, res, next) {
        try {
            const {data} = await axios({
                method: 'get',
                url: 'https://api.myanimelist.net/v2/manga/ranking?ranking_type=all&limit=40',
                headers: {
                    "X-MAL-CLIENT-ID": "aad45b6564954e88533f9ad51291a312"
                }

            })           

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


}



module.exports = Controllers