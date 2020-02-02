const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { versionKey: false });

const Admin = mongoose.model('Admin', adminSchema, 'admins');
module.exports = Admin;