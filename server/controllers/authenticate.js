require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  if (req.cookies.Auth) {
    console.log('cookies: ', req.cookies);
    try {
      const auth = jwt.verify(req.cookies.Auth, process.env.TOKEN_KEY);
      console.log('decoded: ', auth);
      res.signedIn = auth;
    } catch (err) {
      console.log('token error: ', err)
    }
  }
  return next();
}