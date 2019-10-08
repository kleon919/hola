const router = require("express").Router();
const jwt = require("jsonwebtoken");

const {staff, customer, session} = require('../models');
const db = require('../models');


const create = async (req, res, next) => {
    try {
        // todo include the creation of the Account that performed in previous middleware into the transaction
        var t = await db.sequelize.transaction();

        const isStaff = req.query.type === 'staff';

        let newOne = (isStaff)
            ? await staff.create(req.body, {transaction: t})
            : await customer.create(req.body, {transaction: t})
        await newOne.setAccount(req.user, {transaction: t})
        t.commit()
        next()
    } catch (err) {
        t.rollback()
        next(err)
    }
};

const fetchStaff = async account => {
    const person = await staff.findOne({where: {accountId: account.id}});
    let body = {_id: account.id, staffId: person.id, role: person.role, hotelId: person.hotelId};
    return {person, body}
};

const fetchCustomer = async account => {
    const person = await customer.findOne({where: {accountId: account.id}})
    const discussion = await session.create({customerId: person.id});// todo: If customer create session Else proceed
    let body = {_id: account.id, customerId: person.id, sessionId: discussion.id}
    return {person, body}
};

module.exports = passport => {

    router.post('/signup', passport.authenticate('signup', {session: false}), create, async (req, res) => {
        res.json(req.user.username + ' created')
    });

    router.post('/login', async (req, res, next) =>
        passport.authenticate('login', async (err, account, info) => {
            try {
                if (err) return next(err);
                if (!account) return next(new Error(info.message));

                const isStaff = req.query.type === 'staff';

                req.login(account, {session: false}, async (err) => {
                    if (err) return next(err);

                    const {person, body} = (isStaff)
                        ? await fetchStaff(account)
                        : await fetchCustomer(account)

                    const token = jwt.sign(body, 'top_secret', {expiresIn: '1h'});

                    res.json({token, username: account.username, ...person.dataValues}) // todo

                });
            } catch (err) {
                return next(err);
            }
        })(req, res, next)
    );

    router.use((err, req, res, next) => {
        console.error(err.stack) // DEBUG
        res.status(500).send(err.message || "Unknown Error")
    });

    return router;

};
