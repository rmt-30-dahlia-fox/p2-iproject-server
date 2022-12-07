const { User, Player, MyTeam, MyPlayer } = require('../models')
const axios = require('axios')
const { comparePassword } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')

class Controller{
    static async register(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            
        } catch (err) {
            next(err)
        }
    }

    static async getPlayers(req, res, next){
        try {
            const format = {
                order: [['proposedMarketValue', 'ASC']],
                limit: 9
            }

            let currentPage = 1
            const {position, page} = req.query

            if(page){
                currentPage = page
                format.offset = currentPage * 9 - 9
            }

            if(position){
                format.where = {
                    position: position
                }
            }

            const players = await Player.findAll(format)
            res.status(200).json(players)
        } catch (err) {
            next(err)
        }
    }

    static async addTeam(req, res, next){
        try {
            const {name, logo} = req.body
            const oldTeam = await MyTeam.findAll({
                where: {ManagerId: req.user.id}
            })

            if(oldTeam.length != 0){
                throw {name: "ForbiddenDoubleTeam"}
            }

            const newTeam = await MyTeam.create({
                name,
                logo,
                ManagerId: req.user.id
            })
            
            res.status(201).json(newTeam)
        } catch (err) {
            next(err)
        }
    }

    static async getMyTeamById(req, res, next){
        try {
            const {myteamId} = req.params
            const myteam = await MyTeam.findByPk(myteamId)

            res.status(200).json(myteam)
        } catch (err) {
            next(err)
        }
    }

    static async updateTeam(req, res, next){
        try {
            const {myteamId} = req.params
            const myteam = await MyTeam.findByPk(myteamId)
            if(!myteam){
                throw {name: "InvalidTeamId"}
            }

            if(myteam.ManagerId !== req.user.id){
                throw {name: "Forbidden"}
            }

            const {name, logo} = req.body
            await MyTeam.update({name, logo}, {
                where: {
                    id: myteamId
                }
            })

            const updatedTeam = await MyTeam.findByPk(myteamId)

            res.status(200).json(updatedTeam)
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