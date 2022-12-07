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

    static async postRegister (req, res, next){
        try {
            let { userName,fullName,photo,role,password,email } = req.body
            if (!photo){
                photo = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }

            let newUser = await User.create({ userName,fullName,photo,role,password,email })

            let regHistory = await History.create({
                type: 'Register',
                description: `${fullName} has been added as ${role} ${userName}`,
                userId: req.user.id
            })

            res.status(201).json({message: `${fullName} has been added as ${role} ${userName}`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller