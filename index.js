const SECRET = require('#root/configs/env')
const express = require('express')
const http = require('http')
const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')
const app = express()
const cors = require('cors')

const send_text_message = require('#root/controller/send_message/send_text_message')
const handle_block_user = require('#root/controller/user/handle_block_user')
const socket_login = require('#root/controller/login')
const user_typing = require('#root/controller/send_message/user_typing')
const connectDB = require('#root/database/config')
const userModal = require('#root/database/model/user')
const mongoose = require('mongoose')
const router = require('#root/routers/router')

const port = SECRET?.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors_origin = SECRET?.CORS_ORIGIN?.split(',')
app.use(cors(
    { origin: "*" }
    // { origin: cors_origin }
))

app.use(router)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
        // origin: cors_origin
    }
})

server.listen(port, async () => {
    await connectDB()
    console.log(`http://localhost:${port}`)
})
// Set up Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('No token provided'));
    }
    jwt.verify(token, SECRET?.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Invalid token'));
        }
        const username = decoded.username;

        // Check if username exists and is verified
        userModal.findOne({ username: username, isVerified: true }).then((user) => {
            if (!user) {
                return next(new Error('Username not found or not verified'));
            }
            socket.username = username;
            socket.user_id = decoded?.user_id
            socket.socketId = decoded.socketId;
            next();
        });
    });
});

io.on("connection", (socket) => {
    const token = jwt.sign({ username: socket.username, user_id: socket.user_id, socketId: socket.id }, SECRET.JWT_SECRET, { expiresIn: '365d' });
    io.to(socket.id).emit('token', token) // return token to client

    // user connect
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
    socket.on('disconnect', async () => {
        try {
            const lastSeen = new Date()
            socket.broadcast.emit("offline", {
                username: socket.username,
                user_id: socket?.user_id,
                isOnline: false,
                lastSeen
            })
            await userModal.updateOne({ _id: new mongoose.Types.ObjectId(socket?.user_id) }, {
                isOnline: false,
                lastSeen,
            })
            console.log(`${socket.id} disconnected. Last seen updated for user ${socket.username} at ${lastSeen}`)
        } catch (error) {
            console.log(error)
        }
    })
});