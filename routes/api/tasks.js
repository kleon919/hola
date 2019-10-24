const router = require("express").Router();
const {task} = require('../../models');
const customerNotifyEmitter = require('../../core/events/customerNotifyEmitter');

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
    router.put('/:taskId', async (req, res) => {
        try {
            await task.update(
                req.body,
                {where: {id: req.params.taskId}},
            );
            const {dataValues} = await task.findByPk(req.params.taskId);
            customerNotifyEmitter.emit('customer:notify', {answer: "Your request has been assigned", customerId: dataValues.customerId})
            res.json("ok")
        } catch (err) {
            res.json(err)
        }
    });

    return router;

};