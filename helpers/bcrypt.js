const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPw(pw) {
  return bcrypt.hashSync(pw, salt);
}

function comparePw(pw, hash) {
  return bcrypt.compareSync(pw, hash);
}

module.exports = { hashPw, comparePw }