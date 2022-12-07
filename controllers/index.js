const { User, Player, MyTeam, MyPlayer } = require('../models')
const axios = require('axios')
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
                access_token: encode({id: user.id})
            })
        } catch (err) {
            next(err)
        }
    }

    static async getPlayers(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async addTeam(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async getMyTeamById(req, res, next){
        try {
            
            
        } catch (err) {
            next(err)
        }
    }

    static async updateTeam(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async addMyPlayer(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async getMyPlayers(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async getMyPlayerById(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async deleteMyPlayer(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller