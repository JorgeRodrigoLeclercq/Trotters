const { Server } = require("socket.io");

const sockets = {};

module.exports = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        // Add socket to sockets object
        sockets[socket.handshake.query.userId] = socket;

        socket.on("send message", (data) => {
            const { to, message } = JSON.parse(data);
            if (sockets[to]) {
                sockets[to].emit("message", message);
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            delete sockets[socket.handshake.query.userId]; // clean up
        });
        console.log(sockets);
    });
};
