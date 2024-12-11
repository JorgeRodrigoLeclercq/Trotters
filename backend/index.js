// Initialization
const express = require("express");
const app = express();

// Configuration
const dotenv = require("dotenv");
dotenv.config();

// MongoDB
const mongoose = require("mongoose");
const port = 3000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routers
const userRouter = require("./routers/user");
app.use("/api/people", userRouter);

const messagingRouter = require("./routers/messaging");
app.use("/api/messaging", messagingRouter);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// HTTP Server & Socket.IO
const { createServer } = require("http");
const httpServer = createServer(app);
require("./socket")(httpServer); // Pass HTTP server to the Socket.IO module

// Start the server
httpServer.listen(process.env.PORT || port, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);