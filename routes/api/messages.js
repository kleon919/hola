const router = require("express").Router();
const {message, booking, task} = require('../../models');
const {analyze} = require('../../core/nlp');
const updateEmitter = require('../../core/events/customerUpdateEmitter');
const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter');
const {random} = require("lodash");
const faker = require("faker");
const {predict} = require('../../core/tf');

const createBooking = async req => {

    let newBooking = await booking.create({
        date_from: faker.date.recent(),
        date_to: faker.date.future(),
        type_of_trip: ['work', 'holiday', 'educational'][random(0, 2)],
        status: 'open',
        customerId: req.user.customerId,
        hotelId: 1,
    });

    hotelNotifyEmitter.emit('hotel.notify', {type: 'booking', ...newBooking.dataValues})

};

const createTask = async req => {

    let newTask = await task.create({
        title: req.body.content,
        body: faker.lorem.paragraph(),
        close_date: faker.date.future(),
        status: 'open',
        sessionId: req.user.sessionId,
        staffId: null,
        hotelId: 1
    });

    hotelNotifyEmitter.emit('hotel.notify', {type: 'task', ...newTask.dataValues})

};

module.exports = () => {

    // Fetch all Messages
    router.get("/", async (req, res) => {
        try {
            res.json(await message.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Message - Append it on a Session
    router.post("/", async (req, res) => {
        try {

            /**
             * If there is a 'questionKey' attribute in body,
             * the event updates the matching customer's field, using the value of the attribute,
             * with the input message
             * */

            if (req.body.questionKey) {
                updateEmitter.emit('customer:update', {
                    customerId: req.user.customerId,
                    [req.body.questionKey]: req.body.content
                });
            }

            const outcome = await analyze(req.body.content);


            predict([0.80854, 0.64067, 0.55155])
                .then(result => {

                    console.log(result)

                })
                .catch(err => {
                    console.log(err)
                })


            if (outcome.answer === "TASK") {
                createTask(req);
                outcome.answer = 'Your request is being processed'
            }
            if (outcome.answer === "BOOKING") {
                createBooking(req);
                outcome.answer = 'Your booking has been counted'
            }
            if (outcome.intent.endsWith('.person')) {
                outcome.answer += req.user.name
            }

            // todo Answer!
            let answer = outcome.answer || "Unfortunately my training is still very limited. But I learn a lot every day and I will be able to serve your request very soon!";

            res.json(answer)

            // todo If message creation failed, it cannot respond with res.json() again!
            await message.create({
                content: req.body.content,
                actor: "client",
                score: outcome.sentiment.score,
                sessionId: req.user.sessionId
            });

            await message.create({
                content: answer,
                actor: "hola",
                sessionId: req.user.sessionId
            });

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Messages of a specific Session
    router.get("/session/:sessionId", async (req, res) => {
        try {
            res.json(await message.findAll({
                where: {sessionId: req.params.sessionId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    /**
     * @swagger
     * /api/messages/customer:
     *   get:
     *     summary: Fetch all Messages of a specific Customer
     *     description: Returns a list of all the messages received by a specific customer, divided into sessions and sorted on date.
     *     tags:
     *       - Messages
     *     security:
     *       - JWT: []
     *     responses:
     *       200:
     *         description: List of messages
     *         schema:
     *           type: object
     *           properties:
     *             animals:
     *               type: array
     *               description: all the animals
     *               items:
     *                 type: string
     */
    router.get("/customer", async (req, res) => {
        try {
            let messages = await message.findAll({
                include: [{
                    model: session,
                    where: {customer_id: req.user.customerId}
                }]
            });

            res.json(messages)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Message
    router.get("/:messageId", async (req, res) => {
        try {
            res.json(await message.findAll({
                where: {id: req.params.messageId}
            }))

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};