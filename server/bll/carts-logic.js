const Cart = require('../models/cart-model');

function checkForActiveCart(user) {
    return new Promise((res, rej) => {
        Cart.find({ user }, null, { sort: { date: -1 } }, (err, carts) => {
            if (err) return rej(err);
            for (let cart of carts) {
                if (cart.isActive) return res(cart);
            }
            return res(undefined);
        });
    });
}

function getOneCart(user) {
    return new Promise((res, rej) => {
        Cart.findOne({ user }).sort({ date: -1 }).populate("user", {
            firstName: 1,
            lastName: 1,
            username: 1,
            email: 1,

        }).exec((err, cart) => {
            if (err) return rej(err);
            return res(cart);
        });
    });
}

function addCart(cart) {
    return new Promise((res, rej) => {
        Cart.updateMany({ user: cart.user }, { isActive: false }, (err, carts) => {
            if (err) { return rej(err) }
            return carts;
        });
        cart.active = true;
        new Cart(cart).save((err, cart) => {
            if (err) { return rej(err) }
            res(cart);
        });
    });
}

function updateCart(cart) {
    return new Promise((res, rej) => {
        Cart.updateOne({ _id: cart._id }, { ...cart }, (err, info) => {
            if (err) { return rej(err) }
            res(info);
        });
    });
}

function closeCart(_id) {
    return new Promise((res, rej) => {
        Cart.updateOne({ _id }, { isActive: false }, (err, info) => err ? rej(err) : res(info));
    });
}

function deleteCart(_id) {
    return new Promise((res, rej) => {
        Cart.deleteOne({ _id }, (err, info) => {
            if (err) { return rej(err) }
            res(info);
        });
    });
}

module.exports = {
    getOneCart,
    addCart,
    updateCart,
    closeCart,
    deleteCart,
    checkForActiveCart
};