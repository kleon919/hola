const router = require("express").Router();

module.exports = db => {

    // Fetch all Staff
    router.get("/", async (req, res) => {
        try {
            const { _id } = req.user;
            console.log(_id)
            res.json(await db.staff.findAll())
        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch a specific Staff member
    router.get("/:staffId", async (req, res) => {
        try {
            let staffMember = await db.staff.findAll({
                where: {id: req.params.staffId}
            })

            res.json(staffMember)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Create a new Staff member
    router.post("/", async (req, res) => {
        try {
            let newStaffMember = await db.staff.create({
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
    router.put("/:staffId", async (req, res) => {
        try {
            let rowsUpdated = await db.user.update(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    profile_pic: req.body.profile_pic,
                    role: req.body.role,
                    hotelId: req.body.hotelId,
                    accountId: req.body.accountId,
                },
                {where: {id: req.params.staffId}}
            );

            // res.json('Staff member has been updated with success.')
            res.json(rowsUpdated)

        } catch (err) {
            res.json(err.message)
        }
    });

    // Fetch all Staff members of a specific Hotel
    router.get("/hotel/:hotelId", async (req, res) => {
        try {
            let staff = await db.staff.findAll({
                where: {hotelId: req.params.hotelId}
            })

            res.json(staff)

        } catch (err) {
            res.json(err.message)
        }
    });

    return router;

}