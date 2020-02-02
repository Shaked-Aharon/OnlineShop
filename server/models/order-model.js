const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    address: {
        city: String,
        street: String,
        house: Number,
        entrance: String,
        floor: Number,
        apartment: Number
    },
    totalPrice: Number,
    dateToDeliver: String,
    orderedAt: Date,
    cc: {
        number: String,
        expiration: String,
        cvv: String
    }
}, {versionKey:false});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;