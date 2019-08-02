const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const times = require("lodash.times");
const random = require("lodash.random");

const db = require("./models");
const passport = require("./middle/passport")(db);

const app = express();

app.use(bodyParser.urlencoded({extended: true, limit: "500mb"}));
app.use(bodyParser.json({limit: "500mb"}));
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(require('./middle/cors'));

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

db.sequelize.sync().then(() => {
    // populate user table with dummy data
    // db.user.bulkCreate(
    //     times(10, () => ({
    //         firstName: "Neoi", //faker.name.firstName(),
    //         lastName: "Wraioi", //faker.name.lastName(),
    //         username: "Kleon",
    //         password:"kleitos"
    //     }))
    // );
    // // populate ticket table with dummy data
    // db.ticket.bulkCreate(
    //     times(10, () => ({
    //         title: "ela",
    //         content: "afou", //faker.lorem.paragraph(),
    //         type: "fhskjdfs",
    //         userId: random(1, 10)
    //     }))
    // );
    // // populate client_dialog table with dummy data
    // db.client_dialog.bulkCreate(
    //     times(20, () => ({
    //         answer: ['ela', 'pou', 'eisai', 'irtha', 'nai', 'oxi'][random(0, 5)],
    //         questionId: random(1, 10),
    //         userId: random(1, 10)
    //     }))
    // );
});

app.listen(9000, () => console.log('Listening..'));