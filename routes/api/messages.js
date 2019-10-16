const router = require("express").Router();
const {analyze} = require('../../core/nlp');
const updateEmitter = require('../../core/events/customerUpdateEmitter')
const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter')
const {random} = require("lodash");
const faker = require("faker");

module.exports = db => {

    // Fetch all Messages
    router.get("/", async (req, res) => {
        try {
            res.json(await db.message.findAll())
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

            (outcome.answer === "BOOKING") && (async (req, db) => {createBooking(req, db); outcome.answer = 'Your booking has been counted'})(req, db);
            (outcome.answer === "TASK") && (async (req, db) => {createTask(req, db); outcome.answer = 'Of course, in 5 minutes it wil be there'})(req, db);

            // todo Answer!
            let answer = outcome.answer || req.body.content + " answered";

            res.json(answer)

            await db.message.create({
                content: req.body.content,
                actor: "client",
                score: outcome.sentiment.score,
                sessionId: req.user.sessionId
            });

            await db.message.create({
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
            let message = await db.message.findAll({
                where: {sessionId: req.params.sessionId}
            })

            res.json(message)

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
            let messages = await db.message.findAll({
                include: [{
                    model: db.session,
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
            let message = await db.message.findAll({
                where: {id: req.params.messageId}
            })

            res.json(message)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}




const createBooking = async (req, db) => {

    let newBooking = await db.booking.create({
            date_from: faker.date.recent(),
            date_to: faker.date.future(),
            type_of_trip: ['work', 'holiday', 'educational'][random(0, 2)],
            customerId: req.user.customerId,
            hotelId: 1,
        }
    );

    hotelNotifyEmitter.emit('hotel.notify', {type: 'booking', status: 'open', hotelId: 1, ...newBooking.dataValues})
}

const createTask = async (req, db) => {

    let newTask = await db.task.create({
            title: faker.lorem.word(),
            body: faker.lorem.paragraph(),
            close_date: faker.date.future(),
            status: 'open',
            staffId: null,
            hotelId: 1
        }
    );

    hotelNotifyEmitter.emit('hotel.notify', {type: 'task', ...newTask.dataValues})

}