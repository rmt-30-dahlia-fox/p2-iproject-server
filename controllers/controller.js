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
            console.log(page, filter, search);
            if (!page) page = 1

            let limit = 6;
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

            console.log(pagedFilteredProducts);
            res.status(200).json(pagedFilteredProducts)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getCategories(req, res, next){
        try {
           let calledCategories = await Category.findAll()

           res.status(200).json(calledCategories)
        } catch (error) {
            next(error)
        }
    }

    static async openTransaction (req, res, next){
        try {
            let code = new Date().toLocaleDateString("fr-CA").replace('-', 'Y').replace('-','M') + 'D'

            let [ calledReport, created ] = await Report.findOrCreate({
                where: {code},
                default: {
                    code,
                    creditValue: 0,
                    debitValue: 0,
                    profit: 0
                }
            })

            let newTransaction = await Transaction.create({
                reportId: calledReport.id,
                cashierId: req.user.id,
                value: 0,
                payment: '',
                point: 0,
                status: 'Open'
            })
            
            if(created) {
                let reportHistory = await History.create({
                    type: 'Report',
                    description: `${new Date().toDateString()} Report has been created`,
                    userId: req.user.id
                })
            } 

            let transactionHistory = await History.create({
                type: 'Transaction',
                description: `Transaction ${newTransaction.id} has been created and is Open`,
                userId: req.user.id
            })

            res.status(201).json({transactionId: newTransaction.id})
        } catch (error) {
            next(error)
        }
    }
    
    static async postCart (req, res, next){
        try {
            let { transactionId, productId, amount, price, discount } = req.body
            let calledProduct = await Product.findOne({where: {id: productId}})

            if (!calledProduct) throw({name: "InvalidProductId"})
            if (calledProduct.status !== 'Active') throw({name: "InvalidProductStatus"})

            if (calledProduct.stock == 0) throw({name: "InvalidProductStock"})
            if (calledProduct.stock < amount) throw({name: "InvalidProductAmount"})

            let value = (100 - discount) * (price * amount)

            let newCart = await Cart.create({ transactionId, productId, amount, price, discount, value })
            
            await History.create({
                type: 'Product',
                description: `Product ${calledProduct.name} has been sold by: ${amount} piece, stock left: ${calledProduct.stock - amount}`,
                userId: req.user.id
            })
            await Product.decrement({stock: amount}, {where: {id: productId} })
            await Product.increment({sales: amount}, {where: {id: productId} })
            
            res.status(201).json(newCart)
        } catch (error) {
            next(error)
        }
    }
    
    static async getCarts(req, res, next){
        try {
            let {transactionId} = req.params

            let calledCarts = await Cart.findAll({where: {transactionId}})

            res.status(200).json(calledCarts)
        } catch (error) {
            next(error)
        }
    }
    
    static async patchCart(req, res, next){
        try {
            let { id } = req.params
            let { amount } = req.body

            let calledCart = await Cart.findOne({where: {id}, include: [Product]})
            if (!calledCart) throw({name: 'InvalidCartId'})
            
            if (calledCart.amount !== amount){

                if (calledCart.amount > amount){
                    let value = calledCart.amount - amount
    
                    await History.create({
                        type: 'Product',
                        description: `Product ${calledCart.Product.name} Stock has been increased by ${value}, from ${calledProduct.stock}`,
                        userId: req.user.id
                    })
    
                    await Product.increment({stock: value}, {where: {id: calledCart.productId}})
                    await calledCart.update({amount})
                } 
                
                else if (calledCart.amount < amount){
                    let value = amount - calledCart.amount
    
                    await History.create({
                        type: 'Product',
                        description: `Product ${calledCart.Product.name} Stock has been decreased by ${value}, from ${calledProduct.stock}`,
                        userId: req.user.id
                    })
    
                    await Product.decrement({stock: value}, {where: {id: calledCart.productId}})
                    await calledCart.update({amount})
                }
            }
            
            res.status(200).json(calledCart)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCart(req, res, next){
        try {
            let {id} = req.params

            let calledCart = await Cart.findOne({where: {id}, include: [Product]})
            if (!calledCart) throw({name: 'InvalidCartId'})

            await Product.increment({stock: calledCart.amount}, {where: {id: calledCart.productId}})
            await Cart.destroy({where: {id}})

            res.status(200).json({message: `${calledCart.Product.name} has been removed`})
        } catch (error) {
            next(error)
        }
    }

    static async getMember (req, res, next){
        try {
            let {name,phone,email} = req.query
            let calledMember;

            if (name) calledMember = await Member.findOne({where: {name}})
            else if (phone) calledMember = await Member.findOne({where: {phone}})
            else if (email) calledMember = calledMember = await Member.findOne({where: {email}})
            else throw ({name: "InvalidMember"})
            
            res.status(200).json(calledMember)
        } catch (error) {
            next(error)
        }
    }
    
    static async closeTransaction(req, res, next){
        try {
            let {id, payment, member} = req.body

            let calledTransaction = await Transaction.findByPk(id)
            if (!calledTransaction) throw({name: "InvalidTransactionId"})

            let calledCarts = await Cart.findAll({where: {transactionId: calledTransaction.id}})

            if (calledCarts.length == 0) {
                console.log('<<<<<<<<<<< Cancelled >>>>>>>>>>>>>>>');
                await calledTransaction.update({status: 'CLosed'})
                let closeHistory = await History.create({
                    type: 'Transaction',
                    description: `Transaction ${calledTransaction.id} is cancelled`,
                    userId: req.user.id
                })

                res.status(200).json({message: `Transaction ${calledTransaction.id} is cancelled`})
            }
            else {
                let totalValue = await Cart.sum("value", {where: {transactionId: calledTransaction.id}})
                
                let point = 0;
                if (member){
                    point = Math.ceil(totalValue / 1000)
    
                    let memberHistory = await History.create({
                        type: 'Member',
                        description: `${member.name} (id: ${member.id}) point has been increased by ${point}, from ${member.point}`,
                        userId: req.user.id
                    })
    
                    await Member.increment({point}, {where: {name: member.name}})
                }
    
                calledCarts.forEach(async el => {
                    await History.create({
                        type: 'Product',
                        description: `Product ${el.name} Stock has been decreased by ${stock}, from ${calledProduct.stock}`,
                        userId: req.user.id
                    })
                })
    
                await calledTransaction.update({
                    value: totalValue,
                    payment,
                    point,
                    status: 'Closed'
                })
    
                res.status(200).json(calledTransaction)
            }
        } catch (error) {
            next(error)
        }
    }
    
    static async refreshReport(req, res, next){
        try {
            let {code} = req.headers

            let calledReport = await Report.findOne({where: {code}})

            let debitValue = await Transaction.sum("value", {where: {reportId: calledReport.id}})
            let creditValue = await Order.sum("orderPrice", {where: {reportId: calledReport.id}})
            let profit = debitValue - creditValue;

            let calledTransactions = await Transaction.findAll({where: {reportId: calledReport.id}, include: [{model: Cart, include: {model: Product}}]})

            let products = {}
            calledTransactions.forEach(transaction => {
                transaction.Cart.forEach(item => {
                    if (!products[`${item.Product.name}`]){
                        products[`${item.Product.name}`] = item.amount
                    } 
                    else {
                        products[`${item.Product.name}`] += item.amount
                    }
                })
            })
            // let calledCarts = await Cart.findAll({
            //     where: {
            //         createdAt: 
            //         {
            //             [Op.gte]: new Date(`${year}-${month}-01, 00:00:00`),
            //             [Op.lte]: new Date(`${year}-${month}-${last}, 23:59:59`)
            //         }
            //     }})

            await calledReport.update({
                creditValue,
                debitValue,
                profit,
                products
            })

            res.status(200).json(calledReport)
        } catch (error) {
            next(error)
        }
    }

    static async postOrder(req, res, next){
        try {
            let code = new Date().toLocaleDateString("fr-CA").replace('-', 'Y').replace('-','M') + 'D'

            let [ calledReport, created ] = await Report.findOrCreate({
                where: {code},
                default: {
                    code,
                    creditValue: 0,
                    debitValue: 0,
                    profit: 0
                }
            })

            if(created) {
                let reportHistory = await History.create({
                    type: 'Report',
                    description: `${new Date().toDateString()} Report has been created`,
                    userId: req.user.id
                })
            } 

            let { name, image, stock, orderPrice, price, vendor, categoryId } = req.body

            let [ calledProduct, isCreated ] = await Product.findOrCreate({
                where: {name},
                default: {
                    name, image, stock, sales: 0, price, vendor, status: 'Active', categoryId
                }
            })

            if(!isCreated){
                let productHistory = await History.create({
                    type: 'Product',
                    description: `Product ${calledProduct.name} Stock has been Increased by ${stock}, from ${calledProduct.stock}`,
                    userId: req.user.id
                })
                await calledProduct.update({stock})
            }
        } catch (error) {
            next(error)
        }
    }

    static async callDailyReport(req, res, next){
        try {
            let {date} = req.body
            let code = (new Date(`${date}`).toLocaleDateString("fr-CA").replace('-', 'Y').replace('-','M') + 'D')

            let calledReport = await Report.findOne({where: {code}})
            if (!calledReport) {
                res.status(200).json({message: `No Report Recorded on ${date}`})
            }

            res.status(200).json(calledReport)
        } catch (error) {
            next(error)
        }
    }
    
    static async callMonthlyReport(req, res, next){
        try {
            let {month, year} = req.body
            let last;
            if (month == 2) last = 28
            else if (month == 2 & year % 4 == 0) last = 29
            else if (month == 4 || month == 6 || month == 9 || month == 11) last = 30
            else last = 31
            

            let calledReports = await Report.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(`${year}-${month}-01, 00:00:00`),
                    [Op.lte]: new Date(`${year}-${month}-${last}, 23:59:59`)
                }
            }})

            let totalCreditValue = await calledReports.sum("creditValue")
            let totalDebitValue = await calledReports.sum("debitValue")
            let totalProfitValue = await calledReports.sum("profit")

            let newMonthlyReport = await Report.create({
                code: `M-${year}Y${month}M`,
                creditValue: totalCreditValue,
                debitValue: totalDebitValue,
                profit: totalProfitValue
            })

            let reportHistory = await History.create({
                type: 'Report',
                description: `Report of month ${month} year ${year} has been created`,
                userId: req.user.id
            })

            res.status(201).json(newMonthlyReport)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller