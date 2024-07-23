const client = require("#root/configs/redis")

async function socket_login(socket, data) {
    try {
        await client.set(data?.username, socket.id)
        socket.broadcast.emit('joined', {
            message: `${data.username} online`
        })
    } catch (error) {
        console.log(error?.message)
    }
}
module.exports = socket_login