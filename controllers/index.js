const { compareHash, hashPass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Activity, Type, Difficulty, Like, Badge } = require("../models");
const axios = require("axios");
const FileReader = require('filereader')
const rapidApiKey = process.env["X-RapidAPI-Key"];
const rapidApiHost = process.env["X-RapidAPI-Host"];

class Controller {
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

      res.status(201).json({ access_token, userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  static async showActivities(req, res, next) {
    try {
      const activities = await Activity.findAll({
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
      console.log('caption', caption);

      const difficulty = await Difficulty.findByPk(DifficultyId)
      const star = difficulty.star

      const user = await User.findByPk(UserId)
      const updatedStar = user.star + star

      await User.update({ star: updatedStar }, {
        where: { id: UserId }
      })

      const imageActivity = `data:image/png;base64,${req.file.buffer.toString('base64')}`

      const activity = await Activity.create({
        UserId,
        name,
        imageActivity,
        caption,
        star,
        TypeId,
        DifficultyId
      })

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
      const { email, password, fullName, dateOfBirth, city, imageProfile } =
        req.body;

      const data = {};
      if (email) data.email = email;
      if (password) data.password = hashPass(password);
      if (fullName) data.fullName = fullName;
      if (dateOfBirth) data.dateOfBirth = dateOfBirth;
      if (city) data.city = city;
      if (imageProfile) data.imageProfile = imageProfile;

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
