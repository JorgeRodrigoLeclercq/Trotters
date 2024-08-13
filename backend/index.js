const express = require('express');
//const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
//app.use(cors());
const port = 3000;
const peopleRouter = require("./routers/people")
const chatRouter = require("./routers/chat")

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/people', peopleRouter)
app.use('/api/chat', chatRouter)

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer( app );
const io = new Server(httpServer);

httpServer.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))

const sockets = {}

io.on('connection', (socket) => {
    sockets[socket.handshake.query.userId] = socket;
    console.log(sockets);
    console.log(`connect: ${socket.handshake.query.userId}`, socket.request.headers);

    socket.on('tamos on?', () => {
        console.log("MANOS ARRIBA CHAVALES!");
    })

    socket.on("send message", (data) => {
        console.log(data);
        const { to, message } = JSON.parse(data);
        if (sockets[to]) {
        sockets[to].emit("message", message);
        }
        });
    
  
    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
    });
});