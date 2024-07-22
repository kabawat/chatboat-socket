require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const cors = require('cors')
const socket_login = require('#root/controller/login')
const connectDB = require('#root/database/config')
const send_text_message = require('#root/controller/send_message/send_text_message')
const user_typing = require('#root/controller/send_message/user_typing')
const handle_block_user = require('#root/controller/user/handle_block_user')
const client = require('#root/configs/redis')
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors_origin = process.env.CORS_ORIGIN?.split(',')
app.use(cors(
    { origin: cors_origin }
))
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: cors_origin
    }
})

server.listen(port, async () => {
    await connectDB()
    console.log(`http://localhost:${port}`)
})

io.on("connection", (socket) => {
    // let connectedClients = {};
    socket.on('login', async (data) => {
        socket_login(socket, data)
    });

    socket.on('send text', data => {
        send_text_message(data, io)
    })

    socket.on('typing', data => {
        user_typing(data, io)
    })

    // "block user"
    socket.on('block user', data => {
        handle_block_user(data, io)
    })
    // Listen for disconnect event
    socket.on('disconnect', async (data) => {
        // await client.delete(data?.username)
        console.log(`${socket.id} disconnected.`);
    });
});