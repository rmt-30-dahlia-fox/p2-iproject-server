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