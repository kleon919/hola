const router = require("express").Router();
const passport = require('../../middle/passport');

module.exports = () => {

    router.use(passport.authenticate('jwt', {session: false}));

    router.use('/customers', require('./customers')());
    router.use('/sessions', require('./sessions')());
    router.use('/messages', require('./messages')());
    router.use('/bookings', require('./bookings')());
    router.use('/hotels', require('./hotels')());
    router.use('/tasks', require('./tasks')());
    router.use('/staff', require('./staff')());
    router.use('/questions', require('./questions')());

    return router;

};