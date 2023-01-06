"use strict";

const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createToken = (payload) => {
  return sign(payload, JWT_SECRET);
}

const verifyToken = (str) => {
  return verify(str, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
}
