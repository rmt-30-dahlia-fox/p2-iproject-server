const bcrypt = require('bcryptjs')

const generateHash = (pwd) => {
    return bcrypt.hashSync(pwd, 8)
}

const verifyHash = (pwd, hashedPwd) => {
    return bcrypt.compareSync(pwd, hashedPwd)
}


module.exports = {generateHash, verifyHash}