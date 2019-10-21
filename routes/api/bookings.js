const router = require("express").Router();
const {booking} = require('../../models');
const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter')

module.exports = () => {

    // Fetch all Bookings
    router.get("/", async (req, res) => {
        try {
            res.json(await booking.findAll({where: {hotelId: req.user.hotelId}}))
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Booking
    router.get("/:bookingId", async (req, res) => {
        try {
            let booking = await booking.findAll({
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
            let newBooking = await booking.create({
                date_from: req.body.date_from,
                date_to: req.body.date_to,
                type_of_trip: req.body.type_of_trip,
                customerId: req.user.customerId,
                hotelId: req.body.hotelId,
            });

            hotelNotifyEmitter.emit('hotel.notify', {user: req.user, ...newBooking.dataValues})

            //res.json('Booking has been created with success.')
            res.json(newBooking)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed Booking
    router.put("/:bookingId", async (req, res) => {
        try {

            let rowsUpdated = await booking.update(
                {
                    date_from: req.body.dateFrom,
                    date_to: req.body.dateTo,
                    type_of_trip: req.body.typeOfTrip,
                    // customerId: req.body.customerId,
                    // hotelId: req.user.hotelId,
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