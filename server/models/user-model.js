const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    address: {
        city: String,
        street: String,
        house: Number,
        entrance: String,
        floor: Number,
        apartment: Number
    }
}, {versionKey:false});

userSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
userSchema.methods.isPasswordValid = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

const User = mongoose.model("User", userSchema, "users");

module.exports = User;