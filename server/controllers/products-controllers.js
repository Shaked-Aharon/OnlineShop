const productLogic = require('../bll/products-logic');
const router = require('express').Router();

// Products Controllers
router.get('/', async (req, res) => {
    try {
        const products = await productLogic.getAllProducts();
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await productLogic.getProductsByCategory(category);
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.get('/id/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        const product = await productLogic.getOneProduct(_id);
        return res.status(200).json(product);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.get('/products/search/:val', async (req, res) => {
    try {
        const val = req.params.val;
        const products = await productLogic.getProductsBySearch(val);
        return res.status(200).json(products);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.post('/', async (req, res) => {
    try {
        const newProduct ={...req.body};
        const addedProduct = await productLogic.addProdcut(newProduct);
        return res.status(200).json(addedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.put('/', async (req, res) => {
    try {
        const product = req.body;
        const updatedProduct = await productLogic.updateProduct(product);
        return res.status(200).json(updatedProduct);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.delete('/products/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        await productLogic.deleteProduct(_id);
        return res.status(200);
    }
    catch (err) { res.status(500).send(err.message) }
});
module.exports = router;