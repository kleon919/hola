const router = require("express").Router();

module.exports = db => {

    // Fetch all possible questions
    router.get("/", async (req, res) => {
        try {
            res.json(await db.question.findAll({attributes: ['id', 'content']}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all questions, answered or not for a user
    router.get("/:userId", async (req, res) => {
        try {
            let all = await db.question.findAll({
                include: [{model: db.user, as: 'Clients', where: {id: req.params.userId}, required: false}]
            })
            res.json(all)
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch user with all his answered questions
    router.get("/answered/:userId", async (req, res) => {
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