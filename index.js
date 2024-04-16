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
const cors_origin = process.env.CORS_ORIGIN?.split(',')
console.log(cors_origin)
app.use(cors(
    { origin: cors_origin }
))
app.get("/", (req, res) => {
    res.send(`<a href='https://kabawat.com'>welcome to kabawat studio</a> <script>window.location.href = "https://kabawat.com"</script>`)
})
const server = http.createServer(app)
let connectedClients = {};
const io = new Server(server, {
    cors: {
        origin: cors_origin
    }
})
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = cors_origin;
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

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
