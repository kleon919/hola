const router = require("express").Router();

module.exports = db => {

    // Fetch all Sessions
    router.get("/", async (req, res) => {
        try {
            res.json(await db.session.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Session
    router.get("/:sessionId", async (req, res) => {
        try {
            res.json(await db.session.findAll({
                where: {id: req.params.sessionId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Sessions of a Customer
    router.get("/customers/:customerId", async (req, res) => {
        try {
            res.json(await db.session.findAll({
                where: {customerId: req.params.customerId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Session for a Customer
    router.post("/", async (req, res) => {
        try {
            res.json(await db.session.create({
                customerId: req.body.customerId
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};