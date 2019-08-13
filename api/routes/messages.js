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

    // Fetch a all Messages of a specific Session
    router.get("/sessions/:sessionId", async (req, res) => {
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
    router.get("/customers/:customerId", async (req, res) => {
        try {
            let message = await db.message.findAll({
                where: {customerId: req.params.customerId}
            })

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Message - Append it on a Session - Depends on a Customer
    router.post("/", async (req, res) => {
        try {
            let message = await db.user.create({
                content: req.body.content,
                customerId: req.body.customerId,
                profile_pic: req.body.profile_pic,
                genre: req.body.genre,
                country: req.body.country,
            });

            //res.json('Customer has been created with success.')
            res.json(newCustomer)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed Customer
    router.put("/:userId", async (req, res) => {
        try {

            let rowsUpdated = await db.user.update(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    profile_pic: req.body.profile_pic,
                    genre: req.body.genre,
                    country: req.body.country,
                },
                {where: {id: req.params.customerId}}
            );

            // res.json('Customer has been updated with success.')
            res.json(rowsUpdated)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}