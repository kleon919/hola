const router = require("express").Router();
const {task} = require('../../models');

module.exports = () => {

    // Fetch all possible Tasks
    router.get("/", async (req, res) => {
        try {
            res.json(await task.findAll({where: {hotelId: req.user.hotelId}}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Task
    router.get("/:taskId", async (req, res) => {
        try {
            res.json(await task.findAll({where: {id: req.params.taskId}}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Tasks of a Staff member
    router.get("/staff/:staffId", async (req, res) => {
        try {
            res.json(await task.findAll({
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

    // Update a task's info
    router.put('/:taskId', async () => {
        await task.update(
            {
                title: req.body.title,
                body: req.body.body,
                close_date: req.body.close_date,
                status: req.body.status,
                staffId: req.body.staffId,
            },
            {where: {id: req.params.taskId}}
        );
    });

    return router;

};