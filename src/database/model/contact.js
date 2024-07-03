const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    blocked_by: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

const contactModal = mongoose.model("Contact", contactSchema)
module.exports = contactModal;
