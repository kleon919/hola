const router = require("express").Router();

module.exports = db => {

    // Fetch all possible Tasks
    router.get("/", async (req, res) => {
        try {
            res.json(await db.task.findAll({where: {hotelId: req.user.hotelId}}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Task
    router.get("/:taskId", async (req, res) => {
        try {

            res.json(await db.task.findAll({
                where: {id: req.params.taskId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Tasks of a Staff member
    router.get("/staff/:staffId", async (req, res) => {
        try {
            res.json(await db.task.findAll({
                where: {staff_id: req.params.staffId}
                // include: [
                //     {
                //         model: db.staff,
                //         as: 'Assignee',
                //         where: {id: req.params.staffId},
                //         required: true
                //     }]
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};