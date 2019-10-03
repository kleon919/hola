const router = require("express").Router();
const {analyze} = require('../../core/nlp');
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

            /**
             * If there is a 'questionKey' attribute in body,
             * the event updates the matching customer's field, using the value of the attribute,
             * with the input message
             * */

            if (req.body.questionKey) {
                updateEmitter.emit('customer:update', {
                    customerId: req.user.customerId,
                    [req.body.questionKey]: req.body.content
                });
            }

            const outcome = await analyze(req.body.content);

            // todo Answer!
            let answer = outcome.answer || req.body.content + " answered";

            res.json(answer)

            await db.message.create({
                content: req.body.content,
                actor: "client",
                score: outcome.sentiment.score,
                sessionId: req.user.sessionId
            });

            await db.message.create({
                content: answer,
                actor: "hola",
                sessionId: req.user.sessionId
            });

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