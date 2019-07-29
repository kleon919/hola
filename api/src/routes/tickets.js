const router = require("express").Router();
const {createTicket, updateTicket} = require('../handlers/tickets-handlers');


router.post("/", createTicket);

router.put("/:id", updateTicket);


module.exports = router;