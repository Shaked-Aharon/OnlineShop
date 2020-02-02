const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now()},
    cartProducts: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: String,
        quantity: Number,
        totalPrice: Number
    }],
    overallPrice: Number,
    isActive: Boolean
}, { versionKey: false });
const Cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = Cart;