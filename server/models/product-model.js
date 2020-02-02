const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    price: Number,
    image: String
}, {versionKey:false});

const Product = mongoose.model("Product", productSchema, "products");

module.exports= Product;