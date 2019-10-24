const router = require("express").Router();
const {customer} = require('../../models');

module.exports = () => {

    // Fetch all Customers
    router.get("/", async (req, res) => {
        try {
            res.json(await customer.findAll({attributes: ['id', 'name', 'surname', 'profile_pic', 'genre', 'country']}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Customer
    router.get("/:customerId", async (req, res) => {
        try {
            res.json(await customer.findAll({where: {id: req.params.customerId}}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Customer // todo UNUSED
    router.post("/", async (req, res) => {
        try {
            res.json(await customer.create(req.body))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed Customer
    router.put("/", async (req, res) => {
        try {

            await customer.update(
                req.body,
                {where: {id: req.user.customerId}}
            );

            res.json('Customer ' + req.user.customerId + ' has been updated with success.')

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};