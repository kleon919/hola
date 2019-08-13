const router = require("express").Router();

module.exports = db => {

    // Fetch all Customers
    router.get("/", async (req, res) => {
        try {
            res.json(await db.customer.findAll({attributes: ['id', 'name', 'surname', 'profile_pic', 'genre', 'country']}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Customer
    router.get("/:customerId", async (req, res) => {
        try {
            let customer = await db.customer.findAll({
                // attributes: ['id', 'name', 'surname'],
                where: {id: req.params.customerId}
            })

            res.json(customer)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Customer
    router.post("/", async (req, res) => {
        try {
            let newCustomer = await db.user.create({
                name: req.body.name,
                surname: req.body.surname,
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