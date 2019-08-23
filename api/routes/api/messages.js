const router = require("express").Router();

module.exports = db => {

    // Fetch all Messages
    router.get("/", async (req, res) => {
        try {
            res.json(await db.message.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Message
    router.get("/:messageId", async (req, res) => {
        try {
            let message = await db.message.findAll({
                where: {id: req.params.messageId}
            })

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Messages of a specific Session
    router.get("/session/:sessionId", async (req, res) => {
        try {
            let message = await db.message.findAll({
                where: {sessionId: req.params.sessionId}
            })

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a all Messages for a specific Customer
    router.get("/customer/:customerId", async (req, res) => {
        try {
            let message = await db.message.findAll({
                where: {customerId: req.params.customerId}
            });

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Message - Append it on a Session - Depends on a Customer
    router.post("/", async (req, res) => {
        try {
            let message = await db.message.create({
                content: req.body.content,
                customerId: req.body.customerId,
                sessionId: req.body.sessionId
            });

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}