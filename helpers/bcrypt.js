const bcrypt = require("bcryptjs");

const hashPassword = (pw) => {
  return bcrypt.hashSync(pw, 8);
};

const comparePassword = (pw, hashedPw) => {
  return bcrypt.compareSync(pw, hashedPw);
};

module.exports = {
  hashPassword,
  comparePassword,
};
