const router = require("express").Router();
const {keys, pickBy, isNull} = require('lodash');

module.exports = db => {

    /**
     * Retrieve all customer's fields which are NULL and bring all available questions for them
     * */
    // Fetch all questions available for a specific customer.
    router.get("/", async (req, res) => {
        try {
            const {dataValues} = await db.customer.findByPk(req.user.customerId)
            const onlyNull = keys(pickBy(dataValues, isNull))
            const questions = await db.question.findAll({where: {key: onlyNull}})
            const final = questions.map(e => e.get())
            res.json(final)
        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

};


