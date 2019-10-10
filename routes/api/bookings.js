const router = require("express").Router();
const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter')

module.exports = db => {

    // Fetch all Bookings
    router.get("/", async (req, res) => {
        try {
            res.json(await db.booking.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Booking
    router.get("/:bookingId", async (req, res) => {
        try {
            let booking = await db.booking.findAll({
                where: {id: req.params.bookingId}
            })

            res.json(booking)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Booking
    router.post("/", async (req, res) => {
        try {
            let newBooking = await db.booking.create({
                date_from: req.body.dateFrom,
                date_to: req.body.dateTo,
                type_of_trip: req.body.typeOfTrip,
                customerId: req.user.customerId,  // todo customerId is existed into req.user?
                hotelId: req.body.hotelId,
            });

            hotelNotifyEmitter.emit('hotel.notify', {user:req.user, ...req.body})

            //res.json('Booking has been created with success.')
            res.json(newBooking)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed Booking
    router.put("/:bookingId", async (req, res) => {
        try {

            let rowsUpdated = await db.user.update(
                {
                    date_from: req.body.dateFrom,
                    date_to: req.body.dateTo,
                    type_of_trip: req.body.typeOfTrip,
                    customerId: req.body.customerId,
                    hotelId: req.body.hotelId,
                },
                {where: {id: req.params.bookingId}}
            );

            // res.json('Booking has been updated with success.')
            res.json(rowsUpdated)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}