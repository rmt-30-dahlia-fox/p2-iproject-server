const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

function generateToken(payload){
  return jwt.sign(payload, secret_key);
}

function decryptToken(token){
  return jwt.verify(token, secret_key);
}

module.exports = {generateToken, decryptToken};