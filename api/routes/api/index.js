const router = require("express").Router();

const customers = require('./customers');
const sessions = require('./sessions');
const bookings = require('./bookings');
const hotels = require('./hotels');
const tasks = require('./tasks');
const staff = require('./staff');

module.exports = db => {

    router.use('/customers', customers(db));
    router.use('/sessions', sessions(db));
    router.use('/bookings', bookings(db));
    router.use('/hotels', hotels(db));
    router.use('/tasks', tasks(db));
    router.use('/staff', staff(db));

    return router;

}