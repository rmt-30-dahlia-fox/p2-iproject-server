const bcrypt = require('bcrypt')

class Password {
    static hashPass (pass){
        let salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(pass, salt)
    }

    static compareHashedPass(pass, hashedPass) {
        return bcrypt.compareSync(pass, hashedPass)
    }
}

module.exports = Password;