const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    chat_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Contact"
    },
    text: String,
    video: String,
    image: String,
    pdf: String,
    audio: String,
    voice: String,
    mark_as_read: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    ],
    delete_from: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true })

const chatModal = mongoose.model("Chat", chatSchema)
module.exports = chatModal;
