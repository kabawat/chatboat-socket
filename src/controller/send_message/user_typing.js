const userModal = require("#root/database/model/user");
const mongoose = require('mongoose')
async function user_typing(data, io) {
    try {
        // Find the user to get socketId and contacts
        const user = await userModal.findOne({ _id: new mongoose.Types.ObjectId(data?.receiver) }, 'socketId contacts');
        if (user) {
            io.to(user?.socketId).emit("typing", data);
        }

    } catch (error) {
        console.error("Error sending text message:", error);
        // Handle error
    }
}

module.exports = user_typing;


