Category = require('../models/category-model');

function getAllCategories() {
    return new Promise((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) return reject(err);
            resolve(categories);
        });
    });
}
function addCategory(categoryName) {
    return new Promise((resolve, reject) => {
        const categoryToAdd = new Category({name: categoryName});
        categoryToAdd.save((err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}

module.exports = {
    getAllCategories,
    addCategory
}