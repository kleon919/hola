const router = require("express").Router();

module.exports = db => {

    router.post("/", async (req, res) => {
        try {
            let newTicket = await db.ticket.create({
                type: req.body.type,
                content: req.body.content
            });

            //res.json('Ticket have been created with success.')
            res.json(newTicket)

        } catch (err) {
            res.json(err.message)
        }
    });

    router.put("/:ticketId", async (req, res) => {
        try {

            let rowsUpdated = await db.ticket.update(
                {
                    type: req.body.type,
                    content: req.body.content
                },
                {where: {id: req.params.ticketId}}
            );

            // res.json('Ticket have been created with success.')
            res.json(rowsUpdated)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}