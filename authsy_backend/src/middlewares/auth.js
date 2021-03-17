const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  // console.log({ requiredRights, info });
  if (requiredRights.includes('2FA')) {
    if (info.accessType !== tokenTypes.ACCESS2FA) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please Complete 2FA'));
    }
  }
  req.user = user;
  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = { auth };
