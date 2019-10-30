const router = require("express").Router();
const {task, message, session} = require('../../models');
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
            const {dataValues: curTask} = await task.findByPk(req.params.taskId);
            const {dataValues: curSession} = await session.findByPk(curTask.sessionId);

            const answer =  "Your request has been assigned"
            customerNotifyEmitter.emit('customer:notify', {answer, customerId: curSession.customerId, sessionId: curTask.sessionId})

            res.json("ok")

            await message.create({
                content: answer,
                actor: "hola",
                sessionId: curTask.sessionId
            });
        } catch (err) {
            res.json(err)
        }
    });

    return router;

};