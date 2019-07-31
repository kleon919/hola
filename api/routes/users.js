const router = require("express").Router();

module.exports = db => {

    // Fetch all users
    router.get("/", async (req, res) => {
        try {
            res.json(await db.user.findAll({attributes: ['id', 'firstName', 'lastName']}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific user
    router.get("/:userId", async (req, res) => {
        try {
            let user = await db.user.findAll({
                attributes: ['id', 'firstName', 'lastName'],
                where: {id: req.params.userId}
            })

            res.json(user)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new user
    router.post("/", async (req, res) => {
        try {
            let newUser = await db.user.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });

            //res.json('User has been created with success.')
            res.json(newUser)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed user
    router.put("/:userId", async (req, res) => {
        try {

            let rowsUpdated = await db.user.update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                },
                {where: {id: req.params.userId}}
            );

            // res.json('User has been updated with success.')
            res.json(rowsUpdated)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}