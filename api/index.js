const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const vizql = require('vizql');
const times = require("lodash.times");
const random = require("lodash.random");
const faker = require("faker");

const db = require("./models");
const passport = require("./middle/passport")(db);

const app = express();

app.use(bodyParser.urlencoded({extended: true, limit: "500mb"}));
app.use(bodyParser.json({limit: "500mb"}));
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(require('./middle/cors'));

app.get('/schema', vizql(db.sequelize).pageRoute);

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: false
    }),
    (req, res) => {
        console.log(1)
    }
);

app.use("/users", require("./routes/users")(db));
app.use("/tickets", require("./routes/tickets")(db));
app.use("/questions", require("./routes/questions")(db));

db.sequelize.sync()
    .then(() => {

    // db.user.bulkCreate(
    //     times(10, () => ({
    //         firstName: faker.name.firstName(),
    //         lastName: faker.name.lastName(),
    //         username: faker.internet.userName(),
    //         password: faker.internet.password()
    //     }))
    // );
    //
    // db.ticket.bulkCreate(
    //     times(10, () => ({
    //         title: faker.lorem.word(),
    //         content: faker.lorem.paragraph(),
    //         type: faker.hacker.noun(),
    //         userId: random(1, 10)
    //     }))
    // );


    // db.dialog.bulkCreate(
    //     times(10, (i) => ({
    //         answer: faker.lorem.word(),
    //         questionId: random(1, 10),
    //         userId: random(1, 10)
    //     }))
    // );


    // db.category.bulkCreate(
    //     times(10, (i) => ({
    //         title: faker.lorem.word(),
    //         subject: faker.lorem.paragraph()
    //     }))
    // );
});

app.listen(8000, () => console.log('Listening..'));