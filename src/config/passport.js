const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;

require('dotenv').config();

module.exports = (app) => {
    const params = {
        secretOrKey: process.env.AUTH_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const jwtStrategy = new JwtStrategy(params, (payload, done) => {
        app.services.user.findOne({ id: payload.id })
            .then(user => {
                if (user) done(null, { ...payload })
                else done(null, false)
            }).catch(err => done(err, false))
    })

    passport.use(jwtStrategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
