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
app.use('/users', userRouter);

const messagingRouter = require('./routers/messaging');
app.use('/messaging', messagingRouter);

// Main Screen Endpoint
app.get('/', (req, res) => {
    res.status(200).send(`
        <h1>Welcome to the Trotters App</h1>
        <p>Click here to read our <a href="/privacy-policy">Privacy Policy</a></p>
    `);
});

// Privacy Policy Endpoint
const privacyPolicy = require('./privacyPolicy');
app.get('/privacy-policy', (req, res) => {
    res.status(200).send(privacyPolicy);
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// HTTP Server & Socket.IO
const { createServer } = require('http');
const httpServer = createServer(app);
require('./socket')(httpServer); 

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, '0.0.0.0');