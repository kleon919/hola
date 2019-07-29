const router = require("express").Router();

module.exports = db => {

    router.post("/", async (req, res) => {
        try {
            let newTicket = await db.ticket.create({
                type: req.body.type,
                content: req.body.content
            })
            // await create(picked)
            //res.json('Ticket have been created with success.')
            res.json(newTicket)
        } catch (err) {
            res.json(err.message)
        }
    });

    router.put("/:id", async (req, res) => {
        try{
            res.json('Ticket have been created with success.')
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}