const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    contacts: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    ],
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    phoneNumber: String,
    about: {
        type: String,
        default: "I'm Using Query Boat"
    },
    otp: String, // one time password for verification of the account
    isVerified: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        asset_id: String,
        public_id: String,
        secure_url: String
    },
    token: String,
    socketId: String

}, { timestamps: true })

const userModal = mongoose.model("User", userSchema)
module.exports = userModal;