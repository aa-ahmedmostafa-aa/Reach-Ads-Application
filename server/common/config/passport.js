/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../../modules/User/Models/User.js';

const jwtOpts = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Ahmed',
  algorithms: ['HS256']
};

passport.use(
  'jwt',
  new passportJwt.Strategy(jwtOpts, async (payload, done) => {
    console.log(payload)
    try {
      const user = await User.findById(payload._id);
      if (user) {
        return done(null, user);
      }
      done(null, false);
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
