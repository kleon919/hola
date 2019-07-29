const {create, update} = require('../core/manage-tickets')

const createTicket = async (req, res) => {
    try {
        // let input = req.body.images
        // let picked = paramsArray.filter(item => input.indexOf(item['Image']) !== -1)
        // await create(picked)
        res.json('Ticket have been created with success.')
    } catch (err) {
        res.json(err.message)
    }
}

const updateTicket = async (req, res) => {
    try{
        res.json('Ticket have been created with success.')
    } catch (err) {
        res.json(err.message)
    }
}


module.exports = {
    createTicket,
    updateTicket
}