// models/Conversation.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    sender: String,
    sentAt: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [messageSchema]
});

const Conversation = mongoose.model('Conversation', conversationSchema, "Chat");

module.exports = Conversation;
