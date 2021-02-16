const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const { getUserBygoogleId } = require('../services/user.service');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
// const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// function generateUserToken(req, res) {
//   const accessToken = token.generateAccessToken(req.user.id);
//   res.send(accessToken);
// }

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   getUserBygoogleId(id).then((user) => {
//     done(null, user);
//   });
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: config.auth.googleId,
      clientSecret: config.auth.googleSecret,
      callbackURL: config.auth.callbackURL,
      // passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const user = await getUserBygoogleId(profile.id);
      if (user) {
        const tokens = await tokenService.generateAuthTokens(user);
        done(null, { user, tokens });
      }
      const newuser = await userService.createUser({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value.split('?')[0],
      });
      const tokens = await tokenService.generateAuthTokens(newuser);
      done(null, { newuser, tokens });
      // res.status(httpStatus.CREATED).send({ user, tokens });
      //     createUser({
      //       googleId: profile.id,
      //       name: profile.displayName,
      //       token: accessToken,
      //       email: profile.emails[0].value,
      //       photo: profile.photos[0].value.split('?')[0],
      //     }).then((user) => done(null, user));
      //   }
    }
  )
);

module.exports = {
  jwtStrategy,
};
