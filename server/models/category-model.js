const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: String
}, { versionKey: false });
const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;