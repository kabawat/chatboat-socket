const client = require("#root/configs/redis");
async function user_typing(data, io) {
    try {
        // Find the user to get socketId and contacts
        const receiver = await client.get(`user${data?.receiver}`)
        if (receiver) {
            io.to(receiver).emit("typing", data);
        }
    } catch (error) {
        console.error("Error sending text message:", error);
        // Handle error
    }
}

module.exports = user_typing;


