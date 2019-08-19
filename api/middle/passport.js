const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

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
                if (!account) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                const validate = await account.isValidPassword(password);
                if (!validate) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, account);
            } catch (error) {
                return done(error);
            }
        }
    ));

    return passport;

};

module.exports = passportLocal;