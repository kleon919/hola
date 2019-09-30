const router = require("express").Router();
let updateEmitter = require('../../core/events/customerUpdateEmitter')

module.exports = db => {

    // Fetch all Messages
    router.get("/", async (req, res) => {
        try {
            res.json(await db.message.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Message - Append it on a Session
    router.post("/", async (req, res) => {
        try {

            if (req.body.questionKey) {
                updateEmitter.emit('event', {
                    customerId: req.user.customerId,
                    [req.body.questionKey]: req.body.content
                });
            }

            await db.message.create({
                content: req.body.content,
                actor: "client",
                sessionId: req.user.sessionId
            });

            // todo Answer!
            let answer = req.body.content + " answered";

            let message = await db.message.create({
                content: answer,
                actor: "hola",
                sessionId: req.user.sessionId
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
    router.get("/customer", async (req, res) => {
        try {
            let messages = await db.message.findAll({
                include: [{
                    model: db.session,
                    where: {customer_id: req.user.customerId}
                }]
            });

            res.json(messages)

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


    return router;

}