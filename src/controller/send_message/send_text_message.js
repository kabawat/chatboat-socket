const chatModal = require("#root/database/model/chat");
const userModal = require("#root/database/model/user");

async function send_text_message(data, io) {
    try {
        // Find the user to get socketId and contacts
        const user = await userModal.findOne({ _id: data?.receiver }, 'socketId contacts');

        // Check if the chat_id exists in the user's contacts
        const exists = user.contacts.some(item => item == data?.chat_id);

        // If chat_id does not exist in contacts, add it
        if (!exists) {
            const contactList = [...user.contacts, data?.chat_id];
            await userModal.updateOne({ _id: data?.receiver }, { contacts: contactList });
        }

        // Create a new chat document with sender as read by default
        const chat_format = new chatModal({
            receiver: data.receiver,
            sender: data.sender,
            text: data?.text,
            chat_id: data?.chat_id,
            mark_as_read: [data.sender] // Set sender as read by default
        });

        // Save the chat message
        const resData = await chat_format.save();

        // Emit event to sender's socket that message is received
        io.to(user?.socketId).emit("received text", resData);
    } catch (error) {
        console.error("Error sending text message:", error);
        // Handle error
    }
}

module.exports = send_text_message;
