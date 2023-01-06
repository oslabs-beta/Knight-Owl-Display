require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  console.log('cookies: ', req.cookies);
  if (req.cookies.Auth) {
    const auth = jwt.verify(req.cookies.Auth, process.env.TOKEN_KEY);
    console.log('decoded: ', auth);
    res.signedIn = auth;
  }
  return next();
}