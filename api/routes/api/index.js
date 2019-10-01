const router = require("express").Router();
const passport = require('../../middle/passport');

module.exports = db => {

    router.use(passport.authenticate('jwt', {session: false}));

    router.use('/customers', require('./customers')(db));
    router.use('/sessions', require('./sessions')(db));
    router.use('/messages', require('./messages')(db));
    router.use('/bookings', require('./bookings')(db));
    router.use('/hotels', require('./hotels')(db));
    router.use('/tasks', require('./tasks')(db));
    router.use('/staff', require('./staff')(db));
    router.use('/questions', require('./questions')(db));

    return router;

}