const { User, Player, MyTeam, MyPlayer } = require('../models')
const axios = require('axios')
const {priceFormat, heightFormat} = require('../helpers/formatters')
const { comparePassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class Controller{
    static async register(req, res, next){
        try {
            const {username, email, password} = req.body
            const newUser = await User.create({username, email, password})
            
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw {name: "RequiredDataLogin"}
            }

            const user = await User.findOne({where: {email}})
            if(!user){
                throw {name: "InvalidLogin"}
            }

            const validPwd = comparePassword(password, user.password)
            if(!validPwd){
                throw {name: "InvalidLogin"}
            }

            res.status(200).json({
                access_token: encode({id: user.id}),
                name: user.username
            })
        } catch (err) {
            next(err)
        }
    }

    static async loginByGoogle(req, res, next){
        try{
            const googleToken = req.headers['google-oauth-token']

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: CLIENT_ID
            });
            const {name, email} = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name,
                    email,
                    password: 'google'
                },
                hooks: false
            });

            const payload = {
                id: user.id
            }

            res.status(200).json({
                msg: `User ${user.email} found`,
                access_token: generateToken(payload),
                name: user.username
            })
           
        } catch (err) {
            next(err)
        }
    }

    static async getPlayers(req, res, next){
        try {
            const format = {
                order: [['proposedMarketValue', 'ASC']],
                limit: 12
            }

            let currentPage = 1
            const {position, page} = req.query

            if(page){
                currentPage = page
                format.offset = currentPage * 12 - 12
            }

            if(position){
                format.where = {
                    position: position
                }
            }

            const players = await Player.findAll(format)

            players.map(el => {
                el.height = heightFormat(el.height)
                el.proposedMarketValue = priceFormat(el.proposedMarketValue)
                return el
            })
            res.status(200).json({
                totalItems: players.length,
                players,
                currentPage
            })
        } catch (err) {
            next(err)
        }
    }

    static async addMyPlayer(req, res, next){
        try {
            const {playerId} = req.params

            const myPlayer = await MyPlayer.create({
                UserId: req.user.id,
                PlayerId: playerId
            })

            res.status(201).json(myPlayer)
        } catch (err) {
            next(err)
        }
    }

    static async getMyPlayers(req, res, next){
        try {

            const myPlayers = await MyPlayer.findAll({
                where: {UserId: req.user.id},
                attributes: ['id', 'status'],
                include: {model: Player}
            })

            res.status(200).json(myPlayers)
        } catch (err) {
            next(err)
        }
    }

    static async getMyPlayerById(req, res, next){
        try {
            const {myplayerId} = req.params
            const myPlayer = await MyPlayer.findByPk(myplayerId, {
                attributes: ['id', 'status'],
                include: {model: Player}
            })
            if(!myPlayer){
                throw {name: "InvalidId"}
            }
            res.status(200).json(myPlayer)
        } catch (err) {
            next(err)
        }
    }

    static async deleteMyPlayer(req, res, next){
        try {
            const {myplayerId} = req.params

            const myPlayer = await MyPlayer.findByPk(myplayerId)
            if(!myPlayer){
                throw {name: "InvalidId"}
            }
        
            await MyPlayer.destroy({where: {id: myplayerId}})

            res.status(200).json({message: "Player has ben successfully released"})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller