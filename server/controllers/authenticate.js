require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  if (req.cookies.Auth) {
    try {
      const auth = jwt.verify(req.cookies.Auth, process.env.TOKEN_KEY);
      res.locals.signedIn = auth;
      res.set({
        'signedIn': true
      })
    } catch (err) {
      res.locals.signedIn = false;
      res.set({
        'signedIn' : false,
      })
    }
  } else {
    res.locals.signedIn = false;
    res.set({
      'signedIn': false
    })
  }
  
  return next();
}