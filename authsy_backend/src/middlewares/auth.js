const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  console.log(req.token)
  if(requiredRights === '2FA'){
    if(req.user.key){
      
    }
  }
  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

const ensureOTP = (req, res, next) => {
  if((req.user.key && req.session.method == 'totp') || !req.user.key) {
      next();
  } else {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate with 2FA'));
  }
}

module.exports = {auth, ensureOTP};
