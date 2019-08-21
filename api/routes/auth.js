const router = require("express").Router();
const jwt = require("jsonwebtoken");

module.exports = passport => {

    router.post('/signup', passport.authenticate('signup', {session: false}), async (req, res) => {
        res.json('elaPousai')
    });

    router.post('/login', async (req, res, next) =>
        passport.authenticate('login', async (err, account, info) => {
            try {
                if (err || !account) return next(new Error(info.message || "Unknown Error"));

                req.login(account, {session: false}, async (err) => {
                    if (err) return next(err);

                    const body = {_id: account.id, username: account.username};
                    const token = jwt.sign(body, 'top_secret', {expiresIn: '1h'});
                    return res.json({token});
                });
            } catch (err) {
                return next(err);
            }
        })(req, res, next)
    );

    return router;

};