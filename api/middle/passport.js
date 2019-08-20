const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passportLocal = db => {

    passport.use('signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const account = await db.account.create({username, password})
                return done(null, account);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const account = await db.account.findOne({where: {username: username}} /*{username}*/)
                if (!account) return done(null, false, {message: 'Incorrect username.'});
                const validate = await account.isValidPassword(password);
                if (!validate) return done(null, false, {message: 'Incorrect password.'});
                return done(null, account);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use('jwt', new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'top_secret',
        },
        (jwtPayload, done) => {
            if (Date.now() > jwtPayload.expires) return done('jwt expired');
            return done(null, jwtPayload);
        }
    ));

    return passport;

};

module.exports = passportLocal;