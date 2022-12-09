const { verifyTOken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalid_token" };
    }

    const payload = verifyTOken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalid_token" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
