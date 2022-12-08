const Token = require("../helpers/jwt");
const { User } = require('../models');

const Authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) throw ({name: "InvalidToken"})
        
        let payload = Token.verify(access_token)
        let calledUser = await User.findByPk(payload.id)
        if (!calledUser) throw ({name: "InvalidToken"})
        
        let { id, userName, role, email } = calledUser
        req.user = { id, userName, role, email }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = Authentication;