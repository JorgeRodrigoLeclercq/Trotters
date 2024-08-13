const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    sender: String,
    sentAt: { type: Date, default: Date.now },
    receiver: String
});

const conversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [messageSchema]
});

const Message = mongoose.model('Message', messageSchema, "Chat");

module.exports = Message;
