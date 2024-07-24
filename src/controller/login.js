const client = require("#root/configs/redis")
const userModal = require("#root/database/model/user")
const mongoose = require("mongoose")

async function socket_login(socket, data) {
    try {
        await client.set(data?.username, socket.id)
        const user = await userModal.findById(socket?.user_id)
        user.isOnline = true
        user.lastSeen = new Date()
        await user.save()
        socket.broadcast.emit("joined", {
            data: {
                username: user.username,
                user_id: user?._id,
                isOnline: true,
                lastSeen: user?.lastSeen
            },
            message: `${user?.firstName} ${user?.lastName} online`
        })
    } catch (error) {
        console.log(error?.message)
    }
}
module.exports = socket_login