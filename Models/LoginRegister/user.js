const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    profilePic: {
        type: String,
        default: 'default-user.jpg'
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;