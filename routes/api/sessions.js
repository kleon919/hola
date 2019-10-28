const router = require("express").Router();
const {session, message} = require('../../models');

module.exports = () => {

    // Fetch all Sessions
    router.get("/", async (req, res) => {
        try {
            res.json(await session.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Sessions and messages of a Customer
    router.get("/customer", async (req, res) => {
        try {
            res.json(await session.findAll({
                include: [{
                    model: message,
                    attributes: ['content', 'actor', 'createdAt'],
                }],
                where: {customerId: req.user.customerId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Session
    router.get("/:sessionId", async (req, res) => {
        try {
            res.json(await session.findAll({
                where: {id: req.params.sessionId}
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Session for a Customer
    router.post("/", async (req, res) => {
        try {
            res.json(await session.create({
                customerId: req.body.customerId
            }))
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};