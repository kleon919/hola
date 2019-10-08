const router = require('express').Router();

module.exports = db => {

    // Fetch all Hotels
    router.get("/", async (req, res) => {

        db.hotel.findAll()
            .then(hotels => res.json(hotels))
            .catch(err => res.json(err.message))

    });

    // Fetch a specific Hotel
    router.get("/:hotelId", async (req, res) => {

        db.hotel.findAll({
            where: {id: req.params.hotelId}
        })
            .then(hotel => res.json(hotel))
            .catch(err => res.json(err))

    });

    // Create a new Hotel
    router.post("/", async (req, res) => {

        db.hotel.create({
            name: req.body.name,
            address: req.body.address
        })
            .then(newHotel => res.json(newHotel))
            .catch(err => res.json(err))

    });

    return router;

}
