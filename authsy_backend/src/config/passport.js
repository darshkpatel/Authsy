// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const { getUserBygoogleId, createUser } = require('../services/user.service');
// const { tokenTypes } = require('./tokens');
// const { User } = require('../models');
// const catchAsync = require('../utils/catchAsync');
// const { userService, tokenService } = require('../services');

// const jwtOptions = {
//   secretOrKey: config.jwt.secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// const jwtVerify = async (payload, done) => {
//   try {
//     if (payload.type !== tokenTypes.ACCESS) {
//       throw new Error('Invalid token type');
//     }
//     const user = await User.findById(payload.sub);
//     if (!user) {
//       return done(null, false);
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  getUserBygoogleId(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.auth.googleId,
      clientSecret: config.auth.googleSecret,
      callbackURL: config.auth.callbackURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      getUserBygoogleId(profile.id).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          createUser({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split('?')[0],
          }).then((user) => done(null, user));
        }
      });
    }
  )
);

// module.exports = {
//   jwtStrategy,
// };
