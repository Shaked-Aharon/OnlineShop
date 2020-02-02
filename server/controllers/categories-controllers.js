const categoryLogic = require('../bll/categories-logic');
const router = require('express').Router();

// Categories Controllers
router.get('/', async (req, res) => {
    try {
        const categories = await categoryLogic.getAllCategories();
        return res.status(200).json(categories);
    }
    catch (err) { res.status(500).send(err.message) }
});

router.post('/', async (req, res) => {
    try {
        const {categoryName} = req.body;
        const addedCategory = await categoryLogic.addCategory(categoryName);
        return res.status(200).json(addedCategory);
    }
    catch (err) { res.status(500).send(err.message) }
});

module.exports = router;