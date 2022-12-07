const { Cart, Category, History, Member, Order, Product, Report, Transaction, User } = require('../models')
const Password = require('../helpers/bcrypt')
const Token = require('../helpers/jwt')

class Controller {
    static async postLogin (req, res, next){
        try {
            let { input, password } = req.body

            let calledUser = await User.findOne({ where: {email: input}})
            if (!calledUser){
                calledUser = await User.findOne({ where: {userName: input}})
                if (!calledUser) throw({name: "InvalidUserLogin"})
            }

            let isTrue = Password.compareHashedPass(password, calledUser.password)
            if (!isTrue) throw({name: "InvalidPasswordLogin"})

            let access_token = Token.generate({id: calledUser.id, role: calledUser.role})

            let {id, userName, email, role} = calledUser
            req.user = {id, userName, email, role}

            let logHistory = await History.create({
                type: 'Login',
                description: `${role} ${userName} has logged in`,
                userId: id
            })

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller