const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Invalid Token" };
    const checkToken = verifyToken(access_token);
    const findUser = await User.findByPk(checkToken.id);
    if (!findUser) throw { name: "Invalid Token" };
    req.user = {
      id: findUser.id,
      email: findUser.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
