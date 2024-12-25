const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    senderId: String,
    receiverId: String
}, { timestamps: true });

const ConversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [MessageSchema] 
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema, "message");
const Conversation = mongoose.model('Conversation', ConversationSchema, "conversation");

module.exports = { Message, Conversation };
