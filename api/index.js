const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");


const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
};

app.use(bodyParser.urlencoded({extended: true, limit: "500mb"}));
app.use(bodyParser.json({limit: "500mb"}));
app.use(cors)
app.use(morgan('combined'));

// app.use("/containers", require("./src/routes/containers"));
app.use("/tickets", require("./src/routes/tickets"));

app.listen(9000, () => console.log('Listening..'));
