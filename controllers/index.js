const { compareHash, hashPass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Activity, Type, Difficulty, Like, Badge } = require("../models");
const axios = require("axios");
const { transporter } = require("../helpers/nodemailer");
const rapidApiKey = process.env["X-RapidAPI-Key"];
const rapidApiHost = process.env["X-RapidAPI-Host"];

class Controller {
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body
      if (!fullName) throw { message: "FullName is required" };
      if (!email) throw { message: "Email is required" };
      if (!password) throw { message: "Password is required" };

      const user = await User.create({
        fullName,
        email,
        password: hashPass(password),
        status: 'Regular',
        star: 0,
        BadgeId: 1,
        imageProfile: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
      })

      const access_token = createToken({ id: user.id }) 

      res.status(201).json({ message: `User ${user.email} success to register`, access_token, userId: user.id })
    } catch (error) {
      next(error)
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { message: "Email is required" };
      if (!password) throw { message: "Password is required" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { message: "Invalid email/password" };

      const valid = compareHash(password, user.password);
      if (!valid) throw { message: "Invalid email/password" };

      const access_token = createToken({ id: user.id });

      res.status(200).json({ access_token, userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  static async showActivities(req, res, next) {
    try {
      const activities = await Activity.findAll({
        order: [["createdAt", 'DESC']],
        include: [User, Type, Difficulty, Like],
      });

      res.status(200).json({ data: activities });
    } catch (error) {
      next(error);
    }
  }

  static async addActivity(req, res, next) {
    try {
      const { caption, name, UserId, TypeId, DifficultyId } = req.body
      if(!caption) throw { message: 'Caption is required' }

      const difficulty = await Difficulty.findByPk(DifficultyId)
      const star = difficulty.star

      const user = await User.findByPk(UserId)
      const updatedStar = user.star + star

      await User.update({ star: updatedStar }, {
        where: { id: UserId }
      })

      let imageActivity
      if(!req.file) {
        imageActivity = 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
      } else {
        imageActivity = `data:image/png;base64,${req.file.buffer.toString('base64')}`
      }

      const activity = await Activity.create({
        UserId,
        name,
        imageActivity,
        caption,
        star,
        TypeId,
        DifficultyId
      })

      let mailDetails = {
        from: "hackfit@yopmail.com",
        to: "tinycalicocat1208@gmail.com",
        subject: "You are success to add an activity!",
        text: `You are being active today with ${name} activities. Keep going! - HackFit -`
      }

      let info = await transporter.sendMail(mailDetails)

      res.status(200).json({ message: "Activity created", activity });
    } catch (error) {
      next(error);
    }
  }

  static async showActivity(req, res, next) {
    try {
      const { activityId } = req.params;

      const activity = await Activity.findByPk(activityId, {
        include: [User, Type, Difficulty, Like],
      });
      if (!activity) throw { message: "Data is not found" };

      res.status(200).json({ activity });
    } catch (error) {
      next(error);
    }
  }

  static async showUsers(req, res, next) {
    try {
      const users = await User.findAll({
        order: [["star", "DESC"]],
        include: Badge,
      });

      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  static async showActivitiesPerUser(req, res, next) {
    try {
      const { userId } = req.params;

      const activities = await Activity.findAll({
        where: { UserId: userId },
        include: [Type, Difficulty, Like],
      });

      res.status(200).json({ data: activities });
    } catch (error) {
      next(error);
    }
  }

  static async showUser(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId, {
        include: [Badge],
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { email, password, fullName, dateOfBirth, city } = req.body;

      const data = {};
      if (email) data.email = email;
      if (password) data.password = hashPass(password);
      if (fullName) data.fullName = fullName;
      if (dateOfBirth) data.dateOfBirth = dateOfBirth;
      if (city) data.city = city;
      if (req.file) {
        data.imageProfile = `data:image/png;base64,${req.file.buffer.toString('base64')}`
      }

      await User.update(data, { where: { id: userId } });

      res.status(200).json({ message: `User ${userId} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async showExercises(req, res, next) {
    try {
      let options = {
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": rapidApiHost,
        },
        params: {
          offset: 0,
        },
      };

      let { name, type, difficulty, page } = req.query;

      if (name) options.params.name = name;
      if (type) options.params.type = type;
      if (difficulty) options.params.difficulty = difficulty;

      if (!page) page = 1;
      options.params.offset = (page - 1) * 10;

      const { data } = await axios.get(
        "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
        options
      );

      const response = {
        currentPage: Number(page),
        exercises: data,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async showTypes(req, res, next) {
    try {
      const types = await Type.findAll();

      res.status(200).json({ data: types });
    } catch (error) {
      next(error);
    }
  }

  static async showDifficulties(req, res, next) {
    try {
      const difficulties = await Difficulty.findAll();

      res.status(200).json({ data: difficulties });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
