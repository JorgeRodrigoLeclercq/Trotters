const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    senderId: String,
    receiverId: String,
    sentAt: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [MessageSchema] // TODO: should the backend or the frontend the one to process the order of the conversations and the last message sent?
});

const Message = mongoose.model('Message', MessageSchema, "message");
const Conversation = mongoose.model('Conversation', ConversationSchema, "conversation");

module.exports = { Message, Conversation };
