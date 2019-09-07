const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {staff, customer, session} = require('../models');

const create = async (req, res, next) => {
    try {
        let newOne = (true)
            ? await customer.create(req.body)
            : await staff.create(req.body)
        newOne.setAccount(req.user);
        next()
    } catch (err) {
        next(err)
    }
};

module.exports = passport => {

    router.post('/signup', passport.authenticate('signup', {session: false}), create, async (req, res) => {
        res.json(req.user.username + ' created')
    });

    router.post('/login', async (req, res, next) =>
        passport.authenticate('login', async (err, account, info) => {
            try {
                if (err || !account) return next(new Error(info.message || "Unknown Error"));

                req.login(account, {session: false}, async (err) => {
                    if (err) return next(err);

                    const person = (true) //todo  customer || staff
                        ? await customer.findOne({where: {accountId: account.id}})
                        : await staff.findOne({where: {accountId: account.id}})

                    // todo If customer create session Else proceed
                    const discussion = (true) //todo  customer || staff
                        ? await session.create({customerId: person.id})
                        : true;

                    const body = {_id: account.id, customerId: person.id, sessionId: discussion.id};
                    const token = jwt.sign(body, 'top_secret', {expiresIn: '1h'});

                    return (true) //todo  customer || staff
                        ? res.json({token, username: account.username, ...person.dataValues}) // todo
                        : res.redirect('/ws-login')
                });
            } catch (err) {
                return next(err);
            }
        })(req, res, next)
    );

    return router;

};
