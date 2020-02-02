const ordersLogic = require('../bll/orders-logic'),
    router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        res.status(200).json(await ordersLogic.addOrder(req.body));
    }
    catch (err) { return res.status(500).send(err.message) }
});

router.get('/total', async (req, res) => {
    try {
        res.status(200).json(await ordersLogic.getTotalOrders());
    } catch (err) { return res.status(500).send(err.message) }
});

router.get('/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        res.status(200).json(await ordersLogic.getOrdersHistory(_id));
    }
    catch (err) { return res.status(500).send(err.message) }
});


module.exports = router;