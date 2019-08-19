const router = require("express").Router();
const jwt = require("jsonwebtoken");

module.exports = passport => {

    router.post('/signup', passport.authenticate('signup', {session: false}), async (req, res) => {
        res.json('elaPousai')
    });

    router.post('/login', async (req, res, next) =>
        passport.authenticate('login', async (err, account, info) => {
            try {
                if (err || !account) {
                    const error = new Error(info.message || "Unknown Error")
                    return next(error);
                }
                req.login(account, {session: false}, async (error) => {
                    if (error) return next(error)
                    const body = {_id: account.id, username: account.username};

                    const token = jwt.sign(body, 'top_secret');

                    return res.json({token});
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next)
    );

    return router;

};