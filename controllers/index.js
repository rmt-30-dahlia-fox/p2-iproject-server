const { default: axios } = require('axios')
const { comparePassword, signToken, hashPassword } = require('../helpers')
const { User, WantToRead } = require('../models')
const { XMAL_CLIENT_ID,CLIENT_ID, Password_Nodemailer } = process.env
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const nodemailer = require('nodemailer')





class Controllers {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if(!email){
                throw {name : 'required', message : "Email is  required" }
            }
            if(!password){
                throw {name : 'required', message : "Password is  required" }
            }
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'data not found', message: 'invalid email or password' }
            const validPassword = comparePassword(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'invalid email or password' }

            const access_token = signToken({
                id: user.id
            })

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async handleGoogleSignIn(req, res, next) {
        try {
            const googleToken = req.headers.google_oauth_token;
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();

            const { email, name } = payload;

            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    email, password: Math.floor(Math.random() * 10000000000)
                },
                hooks: false
            })

            res.status(200).json({
                message: `User ${user.email} found`,
                access_token: signToken({ id: user.id }),
                user: {
                    name: user.username
                }
            })


        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            let { email, password } = req.body
            if (!password) {
                throw { name: 'data not found', message: "Password is required" }
            }
            password = hashPassword(password)
            const newUser = await User.create({ email, password })

            const payload = {
                id: newUser.id
            }

            const access_token = signToken(payload)

            res.status(201).json({
                id: newUser.id, email: newUser.email, access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async showMangaList(req, res, next) {
        try {
            let { type, page } = req.query
            let offset
            if (!type) {
                type = 'all'
            }
            if (!page) {
                offset = 0
            } else {
                offset = page * 10 - 10
            }

            const { data } = await axios({
                method: 'get',
                url: `https://api.myanimelist.net/v2/manga/ranking?ranking_type=${type}&limit=10&offset=${offset}`,
                headers: {
                    "X-MAL-CLIENT-ID": XMAL_CLIENT_ID
                }

            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showMangaDetail(req, res, next) {
        try {

            const { id } = req.params
            const { data } = await axios({
                method: 'get',
                url: `https://api.myanimelist.net/v2/manga/${id}?fields=id,status,title,main_picture,synopsis,mean`,
                headers: {
                    "X-MAL-CLIENT-ID": XMAL_CLIENT_ID
                }
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async findManga(req, res, next) {
        try {
            const { search } = req.body
            const { page } = req.query
            let offset;
            if (!page) {
                offset = 0
            } else {
                offset = page * 10 - 10
            }

            const { id } = req.params
            const { data } = await axios({
                method: 'get',
                url: `https://api.myanimelist.net/v2/manga?q=${search}&limit=10&offset=${offset}`,
                headers: {
                    "X-MAL-CLIENT-ID": XMAL_CLIENT_ID
                }
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showWantToRead(req, res, next) {
        try {
            const list = await WantToRead.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(list)

        } catch (error) {
            next(error)
        }
    }

    static async mailWantToRead(req, res, next) {
        try {
            const list = await WantToRead.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            if(!list){
                throw {name : "400status", message : "There is no manga in your want to read list"}
            }

            let sendList = "";
            list.forEach(el=>{sendList += el.title + ", "})
            sendList = sendList.slice(0,(sendList.length-2)) + " !!"

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 486,
                auth: {
                    user: 'syprymanao@gmail.com',
                    pass: Password_Nodemailer,
                },
            });

            const mailOptions = {
                from: "syprymanao@gmail.com",
                to: req.user.email,
                subject: "Your Want To Read list of Mangas",
                text: `Let's go read ${sendList}`,
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    return res.status(500).json({ message: "error sending mail" });
                }
            });

            res.status(200).json({message : "An email with the wanttoread list in it has been sent to you"})

        } catch (error) {
            next(error)
        }
    }



    static async createWantToRead(req, res, next) {
        try {
            const { MangaId, mainPicture, title } = req.body
            if (!MangaId) {
                throw { name: "required", message: "MangaId is required" }
            }
            if (!mainPicture) {
                throw { name: "required", message: "Main Picture is required" }
            }
            if (!title) {
                throw { name: "required", message: "Title is required" }
            }
            const [newList, created] = await WantToRead.findOrCreate({
                where: {
                    UserId: req.user.id, MangaId
                }
                , defaults: { MangaId, UserId: req.user.id, mainPicture, title, status: false }
            })

            if (!created) {
                throw { name: "required", message:  `Manga ${title} is already on the want to read list` }
            }


            res.status(201).json(newList)

        } catch (error) {
            next(error)
        }
    }



    static async deleteWantToRead(req, res, next) {
        try {
            const { id } = req.params
            const list = await WantToRead.findByPk(id)
            const old = list
            await list.destroy()
            res.status(200).json({ message: `Succeed at deleting manga ${old.title} from want to read list` })
        } catch (error) {
            next(error)
        }
    }

    static async updateStatusWantToRead(req, res, next) {
        try {
            const { id } = req.params
            const { statusRead } = req.body
            if (statusRead != "Finished" && statusRead != "Unfinished") {
                throw { name: "400status", message: "status can only be Finished or Unfinished" }
            }
            const list = await WantToRead.findByPk( id)
            const old = list.statusRead
            await list.update({statusRead})

            res.status(200).json({ message: `Succeed at updating status manga from ${old} to ${statusRead}` })
        } catch (error) {
            next(error)
        }
    }




}



module.exports = Controllers