const { default: axios } = require('axios')
const { comparePassword, signToken, hashPassword } = require('../helpers')
const { User, Manga, WantToRead } = require('../models')
const { XMAL_CLIENT_ID } = process.env





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
            let { email, password } = req.body
            if (!password) {
                throw { name: 'data not found', message: "Password is required" }
            }
            password = hashPassword(password)
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
            const { data } = await axios({
                method: 'get',
                url: 'https://api.myanimelist.net/v2/manga/ranking?ranking_type=all&limit=40',
                headers: {
                    "X-MAL-CLIENT-ID": XMAL_CLIENT_ID
                }

            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showMangaDetail(req, res, next) {
        try {

            const { id } = req.params
            const { data } = await axios({
                method: 'get',
                url: `https://api.myanimelist.net/v2/manga/${id}?fields=id,status,title,main_picture,synopsis,mean`,
                headers: {
                    "X-MAL-CLIENT-ID": XMAL_CLIENT_ID
                }
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showWantToRead(req, res, next) {
        try {
            const list = await WantToRead.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(list)

        } catch (error) {
            next(error)
        }
    }

    static async createWantToRead(req, res, next) {
        try {
            const { MangaId, mainPicture, title } = req.body
            if(!MangaId){
                throw {name: "required", message : "MangaId is required" }
            }
            if(!mainPicture){
                throw {name: "required", message : "Main Picture is required" }
            }
            if(!title){
                throw {name: "required", message : "Title is required" }
            }
            const [newList, created] = await WantToRead.findOrCreate({
                where: {
                    UserId: req.user.id, MangaId
                }
            , defaults: { MangaId, UserId: req.user.id, mainPicture, title ,status:false}})

        if (!created) {
            throw { name: "required", message: "The manga is already on the want to read list" }
        }

        res.status(201).json(newList)

    } catch(error) {
        next(error)
    }
}

    static async deleteWantToRead(req, res, next) {
    try {
        const { id } = req.params
        const list = await WantToRead.findByPk(id)
        const old = list
        await list.destroy()
        res.status(200).json({ message: `Succeed at deleting manga ${old.title} from want to read list` })
    } catch (error) {
        next(error)
    }
}

    static async updateStatusWantToRead(req, res, next){
    try {
        const { id } = req.params
        const { status } = req.body
        if (status != "true" || status != "false") {
            throw { name: "403status", message: "status can only be true or false" }
        }
        const list = await WantToRead.update({ where: { id } }, { status })

        res.status(200).json({ message: `Succeed at updating status manga ${list.title}` })
    } catch (error) {
        next(error)
    }
}


}



module.exports = Controllers