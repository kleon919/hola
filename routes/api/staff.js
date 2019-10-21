const router = require("express").Router();
const {staff} = require('../../models');

module.exports = db => {

    // Fetch all Staff
    router.get("/", async (req, res) => {
        try {
            const {_id} = req.user;
            console.log(_id)
            res.json(await staff.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    router.get("/hotel", async (req, res) => {
        try {

            let net = await hotel.findOne({
                include: [{
                    model: staff
                    // attributes: ['']
                }],
                where: {id: req.user.hotelId}
            })


            // let staff = await staff.findAll({
            //     where: {hotelId: req.params.hotelId}
            // })

            res.json(net)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Staff member
    router.get("/:staffId", async (req, res) => {
        try {
            let staffMember = await staff.findAll({
                where: {id: req.params.staffId}
            })

            res.json(staffMember)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Staff member // todo UNUSED
    router.post("/", async (req, res) => {
        try {
            let newStaffMember = await staff.create({
                name: req.body.name,
                surname: req.body.surname,
                profile_pic: req.body.profile_pic,
                role: req.body.role,
                hotelId: req.body.hotelId,
                accountId: req.body.accountId
            });

            //res.json('Staff Member has been created with success.')
            res.json(newStaffMember)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Update an existed Staff member
    router.put("/", async (req, res) => {
        try {
            await staff.update(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    profile_pic: req.body.profile_pic,
                    role: req.body.role,    // todo: Is able to get changed
                    hotelId: req.body.hotelId,
                },
                {where: {id: req.user.staffId}}
            );

            res.json('Staff member ' + req.user.staffId + ' has been updated with success.')

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Staff members of a specific Hotel
    return router;

}