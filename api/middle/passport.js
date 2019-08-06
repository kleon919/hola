const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const passportLocal = db => {

    passport.use(new LocalStrategy(
        (username, password, done) =>
            db.user.findOne({where: {username: username}})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    if (user.password !== password) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user);
                })
                .catch(err => {
                    return done(err)
                })
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    return passport

}


module.exports = passportLocal;

