const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token) {
        throw { name: "Login required" };
    }

    const payload = verifyToken(access_token);

    if (!payload) {
      throw { name: "Invalid Token" };
    }

    const findUser = await User.findByPk(payload.id);
    if (!findUser) {
        throw { name: "Invalid Token" };
    }

    req.user = { id: findUser.id };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
