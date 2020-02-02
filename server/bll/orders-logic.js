const Order = require('../models/order-model');
function addOrder(order) {
    return new Promise((res, rej) => {
        new Order(order).save((err, info) => {
            if (err) { return rej(err) };
            res(info);
        });
    });
}

function getOrdersHistory(_id) {
    return new Promise((res, rej) => {
        Order.find({ user: _id }, (err, orders) => {
            if (err) return rej(err);
            return res(orders);
        });
    });
}

function getTotalOrders(){
    return new Promise((res, rej) => {
        Order.count({}, (err, count) => {
            if (err) return rej(err);
            return res(count);
        });
    });
}

module.exports = {
    addOrder,
    getOrdersHistory,
    getTotalOrders
}