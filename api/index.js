const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const vizql = require('vizql');
const times = require("lodash.times");
const random = require("lodash.random");
const faker = require("faker");

const db = require("./models");
const passport = require("./middle/passport")(db);

const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({extended: true, limit: "500mb"}));
app.use(bodyParser.json({limit: "500mb"}));
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(require('./middle/cors'));

app.get('/schema', vizql(db.sequelize).pageRoute);

app.use("/customers", routes.customers(db));
app.use("/sessions", routes.sessions(db));
app.use("/bookings", routes.bookings(db));
app.use("/hotels", routes.hotels(db));
app.use("/tasks", routes.tasks(db));
app.use("/staff", routes.staff(db));
app.use("/auth", routes.auth(passport));


db.sequelize.query('DROP SCHEMA IF EXISTS `hola_db`;', {raw: true})
    .then(() => db.sequelize.query('CREATE SCHEMA IF NOT EXISTS `hola_db`;', {raw: true}))
    .then(() => db.sequelize.query('USE `hola_db`;', {raw: true}))
    .then(() => db.sequelize.sync())
    .then(() => {

        db.hotel.bulkCreate(times(10, () => ({
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
        })))
            .then(() => db.room.bulkCreate(times(20, () => ({
                room_number: faker.random.number(),
                type: ['floor','top','middle'][(random(0,2))],
                hotelId: random(1,5)
            }))));

        db.account.bulkCreate(times(10, () => ({
            username: faker.internet.userName(),
            password: faker.internet.password()
        })), {individualHooks: true})
            .then(createdInstances => db.customer.bulkCreate(times(10, (i) => ({
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                profile_pic: faker.image.imageUrl(),
                genre: ['Male', 'Female'][random(0, 1)],
                country: faker.address.country(),
                accountId: createdInstances[i].dataValues.id
            })), {individualHooks: true}))
            .then(createdInstances => db.booking.bulkCreate(times(10, (i) => ({
                date_from: faker.date.recent(),
                date_to: faker.date.future(),
                type_of_trip: ['work', 'holiday', 'educational'][random(0,2)],
                customerId: createdInstances[i].dataValues.id,
                hotelId: random(1,5)
            }))));

        db.account.bulkCreate(times(10, () => ({
            username: faker.internet.userName(),
            password: faker.internet.password()
        })), {individualHooks: true})
            .then( createdInstances => db.staff.bulkCreate(times(10, (i) => ({
                name: faker.name.firstName(),
                profile_pic: faker.image.imageUrl(),
                role: random(1, 3),
                accountId: createdInstances[i].dataValues.id,
                hotelId: random(1,5)
            })), {individualHooks: true}))
            .then(createdInstances => db.task.bulkCreate(times(10, (i) => ({
                title: faker.lorem.word(),
                body: faker.lorem.paragraph(),
                close_date: faker.date.future(),
                status: ['ON', 'OFF'][random(0, 1)],
                hotelStaffId: createdInstances[i].dataValues.id
            })), {individualHooks: true}))
            .then(createdInstances => db.ticket.bulkCreate(times(10, (i) => ({
                title: faker.lorem.word(),
                content: faker.hacker.phrase(),
                taskId: createdInstances[i].dataValues.id
            }))));

    })
    .catch(err => console.log(err));

app.listen(8000, () => console.log('Listening..'));