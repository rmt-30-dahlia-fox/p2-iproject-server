const bcrypt = require('bcryptjs')

const hashPassword = (pw) => {
    return bcrypt.hashSync(pw)
}

const comparePassword = (pw, hashedPwd) => {
    return bcrypt.compareSync(pw, hashedPwd)
}

module.exports = {hashPassword, comparePassword}