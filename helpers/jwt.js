const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, "cobra");
};

const verifyToken = (token) => {
  return jwt.verify(token, "cobra");
};

module.exports = { generateToken, verifyToken };
