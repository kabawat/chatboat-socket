const userModal = require("#db/models/user")

async function socket_login(socket, data) {
    const res = await userModal.updateOne({ _id: data?._id }, { socketId: socket.id })
    socket.broadcast.emit('logedin', {
        message: `${data.username} online`
    })
}
module.exports = socket_login