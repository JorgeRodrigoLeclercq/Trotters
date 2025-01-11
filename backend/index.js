// Initialization
const express = require('express');
const app = express();

// CORS
const cors = require('cors');
app.use(cors({ origin: '*' }));

// Configuration
const dotenv = require('dotenv');
dotenv.config();

// MongoDB
const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGO_URL)

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routers
const userRouter = require('./routers/user');
app.use('/api/users', userRouter);

const messagingRouter = require('./routers/messaging');
app.use('/api/messaging', messagingRouter);

// HTTP Server & Socket.IO
const { createServer } = require('http');
const httpServer = createServer(app);
require('./socket')(httpServer); 

// Start the server
httpServer.listen(process.env.PORT, '0.0.0.0');