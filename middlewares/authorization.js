const { User } = require('../models')

class Authorization {
    static async register (req, res, next) {
        try {
            if (req.user.role == "Admin") next()
            else throw ({name: "FailedRegisterAuthorization"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Authorization