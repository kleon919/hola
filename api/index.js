const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const vizql = require('vizql');
const times = require("lodash.times");
const random = require("lodash.random");
const faker = require("faker");

const device = require('express-device')

const db = require("./models");
const {passport, cors} = require('./middle');

const app = express();
const appWS = require('express-ws')(app);

const {auth} = require('./routes');
const secureRoutes = require('./routes/api');

app.use(bodyParser.urlencoded({extended: true, limit: "500mb"}));
app.use(bodyParser.json({limit: "500mb"}));
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(cors);
app.use(device.capture());

app.use((req, res, next) => {
    console.log('http & ws');
    return next();
});
app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get('/schema', vizql(db.sequelize).pageRoute);

let clients = []

app.ws('/ws-login', (ws, req) => {

    // todo: Associate ws connection with the id of the client
    clients.push(ws)

    ws.on('message', (msg) => {
        clients.map(con => con.send("Iela mwreeee"))
        // ws.send(msg + " EVRETHI");
    });

    ws.on('close', (c) => {
        console.log(c)
    })
});

// app.get('/avout/:num', (req, res) => {
//
//     // todo : require notification-emitter
//
//     if (req.params.num === "0") {
//         clients[0].send('prwtos kai kalos')
//     } else if (req.params.num === "1") {
//         clients[1].send('deuteros kai kalos')
//     } else {
//
//         myEmitter.emit('event');
//     }
//
//     res.send("ntaxei")
//
// });
//
// myEmitter.on('event', () => {
//     console.log('an event occurred!');
//     clients.map(c => c.send("pros Olousss"))
// });

app.use('/', auth(passport));
app.use('/api', passport.authenticate('jwt', {session: false}), secureRoutes(db));

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
                type: ['floor', 'top', 'middle'][(random(0, 2))],
                hotelId: random(1, 5)
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
                type_of_trip: ['work', 'holiday', 'educational'][random(0, 2)],
                customerId: createdInstances[i].dataValues.id,
                hotelId: random(1, 5)
            }))));

        db.account.bulkCreate(times(10, () => ({
            username: faker.internet.userName(),
            password: faker.internet.password()
        })), {individualHooks: true})
            .then(createdInstances => db.staff.bulkCreate(times(10, (i) => ({
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                profile_pic: faker.image.imageUrl(),
                role: random(1, 3),
                accountId: createdInstances[i].dataValues.id,
                hotelId: random(1, 5)
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



