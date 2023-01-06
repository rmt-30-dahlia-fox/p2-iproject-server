"use strict";

const { compareSync } = require("bcryptjs");
const { PASS } = process.env;

const comparePass = (str) => {
  return compareSync(str, PASS);
}

module.exports = {
  comparePass,
}
