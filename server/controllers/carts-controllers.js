const cartsLogic = require('../bll/carts-logic');
const router = require('express').Router();

router.get('/:_id', async (req, res) => {
    try {
        const cart = await cartsLogic.getOneCart(req.params._id);
        return res.status(200).json(cart);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.post('/has-active', async (req, res) => {
    try {
        const { user } = { ...req.body }
        const carts = await cartsLogic.checkForActiveCart(user);
        return res.status(200).json(carts);
    } catch (err) { res.status(500).send(err.message) }
});

router.post('/', async (req, res) => {
    try {
        const addedCart = await cartsLogic.addCart(req.body);
        return res.status(200).json(addedCart);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.put('/', async (req, res) => {
    try {
        const updatedCart = await cartsLogic.updateCart(req.body);
        return res.status(200).json(updatedCart);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.put('/close', async (req, res) => {
    try {
        const { cart_id } = { ...req.body }
        const a = await cartsLogic.closeCart(cart_id);
        return res.status(200).send(a);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.delete('/:_id', async (req, res) => {
    try {
        return res.status(200).json(await cartsLogic.deleteCart(req.params._id));
    }
    catch (err) { res.status(500).send(err.message) }
});

module.exports = router;