module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Credentials", true);

    ('OPTIONS' == req.method) && res.send(200);

    next();
};
