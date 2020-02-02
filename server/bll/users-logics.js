const User = require('../models/user-model');

function updateUser(user) {
    return new Promise((res, rej) => {
            User.findOneAndUpdate({ _id: user._id }, user, { new: true}, (err, info) => {
                if (err) { return rej(err) };
                res(info);
            });
        });
}
module.exports = {
    updateUser
}