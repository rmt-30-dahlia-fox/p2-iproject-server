const { Cart, Category, History, Member, Order, Product, Report, Transaction, User } = require('../models')
const Password = require('../helpers/bcrypt')
const Token = require('../helpers/jwt')
const { Op } = require('sequelize')

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

            let {id, userName, fullName, photo, email, role} = calledUser
            req.user = {id, userName, email, role}

            await History.create({
                type: 'Login',
                description: `${role} ${userName} has logged in`,
                userId: id
            })
            res.status(200).json({access_token, id, userName, fullName, photo, email, role})
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

            await User.create({ userName,fullName,photo,role,password,email })

            await History.create({
                type: 'Register',
                description: `${fullName} has been added as ${role} ${userName}`,
                userId: req.user.id
            })

            res.status(201).json({message: `${fullName} has been added as ${role} ${userName}`})
        } catch (error) {
            next(error)
        }
    }

    static async postMember (req, res, next){
        try {
            let { name,gender,email,phone,point } = req.body
            if (!point) point = 0;

            await Member.create({ name,gender,email,phone,point,cashierId: req.user.id })

            await History.create({
                type: 'Member',
                description: `${name} has been added as member`,
                userId: req.user.id
            })

            res.status(201).json({message: `${name} has been added as member`})
        } catch (error) {
            next(error)
        }
    }

    static async filterPaginatedProducts(req, res, next){
        try {
            let {page, filter, search} = req.query
            if (!page) page = 1

            let limit = 8;
            let offset = (page - 1) * limit;

            let pagedFilteredProducts;
            if (!filter && !search){
                pagedFilteredProducts = await Product.findAndCountAll({where: {status: 'Active'}, limit, offset, include: [Category]});
            } else if (!filter && search) {
                pagedFilteredProducts = await Product.findAndCountAll({where: {status: 'Active', name: {[Op.iLike]: `%${search}%`}}, limit, offset, include: [Category]});
            } else if (filter && !search) {
                pagedFilteredProducts = await Product.findAndCountAll({where: {status: 'Active', categoryId: filter}, limit, offset, include: [Category]});
            } else if (filter && search) {
                pagedFilteredProducts = await Product.findAndCountAll({where: {status: 'Active', categoryId: filter, name: {[Op.iLike]: `%${search}%`}}, limit, offset, include: [Category]});
            }

            res.status(200).json(pagedFilteredProducts)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Controller