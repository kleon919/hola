const router = require("express").Router();

module.exports = db => {

    // Fetch all possible questions
    router.get("/", async (req, res) => {
        try {
            let questions = await db.question.findAll()
            res.json(questions)
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all answered questions of a user
    router.get("/:userId", async (req, res) => {
        try {
            let answered = await db.user.findAll({
                where: {id: req.params.userId},
                include: [{model: db.question, as: 'Dialogs'}]
            })
            res.json(answered)
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};