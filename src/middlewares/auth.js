const jwt = require('jsonwebtoken');
const log = require('../config/log');

const {
  JWT_SECRET_TOKEN,
  JWT_SECRET_TOKEN_EXPIRES_IN,
} = process.env;

const ReturnError = (res) => {
  log.error('Unauthorized');
  res.sendStatus(401);
};

class Auth {
  static async authenticate(req, res, next) {
    try {
      const authorizationToken = req.headers && req.headers.authorization ? req.headers.authorization : null;
      if (authorizationToken === null) {
        log.error(`Error on Auth.authenticate: "No user session token on the request"`);
        return ReturnError(res);
      }
      const userToken = Auth.getToken(authorizationToken);
      if (userToken !== null) {
        log.info(`User ${userToken.email} - ${req.originalUrl} ${req.body.query}`);
        return next();
      }
      return ReturnError(res);
    } catch (e) {
      return ReturnError(res);
    }
  }
  
  static getToken(authorizationToken) {
    try {
      const decodedToken = jwt.verify(authorizationToken.replace('Bearer ', ''), JWT_SECRET_TOKEN);
      return decodedToken;
    } catch (error) {
      log.error(`Error on Auth.getToken: "${error}"\nauthorizationToken: ${authorizationToken}`);
      return null;
    }
  }
  
  static createToken(obj) {
    try {
      const token = jwt.sign(obj, JWT_SECRET_TOKEN, { expiresIn: JWT_SECRET_TOKEN_EXPIRES_IN });
      return `Bearer ${token}`;
    } catch (error) {
      log.error(`Error on Auth.createToken: "${error}"`);
      return null;
    }
  }
}

module.exports = Auth;
