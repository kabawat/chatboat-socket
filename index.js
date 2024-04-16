const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const path = require('path')
const dot = require('dotenv').config()
const cors = require('cors')
const socket_login = require('#root/controller/login')
const connectDB = require('#root/database/config')
const port = process.env.PORT || 2917
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { origin: ['http://localhost:3000', ' http://127.0.0.1:3000', 'https://blissful-shadow-99347.pktriot.net'] }
))
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
const server = http.createServer(app)
let connectedClients = {};
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', ' http://127.0.0.1:3000', 'https://blissful-shadow-99347.pktriot.net']
    }
})

// socket data 
const startSocketServer = () => {
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);
        // Listen for login event
        socket.on('login', (data) => {
            console.log("data : ", data)
            connectedClients[socket.id] = data?.username;
            socket_login(socket, data)
        });

        // Listen for disconnect event
        socket.on('disconnect', () => {
            if (connectedClients[socket.id]) {
                console.log(`${connectedClients[socket.id]} disconnected.`);
                delete connectedClients[socket.id];
            }
        });
    });
};

// server listen 
server.listen(port, async () => {
    await connectDB()
    startSocketServer()
    console.log(`http://localhost:${port}`)
})
