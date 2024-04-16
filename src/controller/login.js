const userModal = require("#root/database/user")

async function socket_login(socket, data) {
    try {
        const res = await userModal.updateOne({ _id: data?._id }, { socketId: socket.id })
        socket.broadcast.emit('logedin', {
            message: `${data.username} online`
        })
    } catch (error) {
        console.log(error?.message)
    }
}
module.exports = socket_login