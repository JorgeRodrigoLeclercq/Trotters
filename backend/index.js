const express = require('express');
//const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
//app.use(cors());
const port = 3000;
const peopleRouter = require("./routers/people")

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/people', peopleRouter)

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer( app );
const io = new Server(httpServer);

httpServer.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))

io.on('connection', (socket) => {
    console.log(`connect: ${socket.id}`, socket.request.headers);

    socket.on('tamos on?', () => {
        console.log("MANOS ARRIBA CHAVALES!");
    })

    socket.on('send message', (message) => {
        console.log(message);
    })
  
    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
    });
});