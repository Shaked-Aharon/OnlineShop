const router = require('express').Router(),
    usersLogic = require('../bll/users-logics');
router.put("/", async (req, res) => {
    try {
        let result = await usersLogic.updateUser(req.body);
        return res.status(200).json("Changes Saved");
        
    }
    catch (err) { res.status(500).send(err.message) };
});
module.exports = router;