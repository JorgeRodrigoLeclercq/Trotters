const { Message, Conversation } = require('../models/messaging');
const User = require('../models/user');

module.exports = {
    sendMessage: async (req, res) => {
        const { content, senderId, receiverId, sentAt } = req.body;

        try {
            // Create a new message
            const newMessage = new Message({
                content,
                senderId,
                receiverId,
                sentAt,
            });
    
            // Find conversation between the sender and the receiver
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });
    
            if (!conversation) {
                // If no conversation exists, create a new one
                conversation = new Conversation({
                    participants: [senderId, receiverId],
                    messages: []
                });
            }
    
            // Add the new message to the conversation
            conversation.messages.push(newMessage);
    
            // Save both the message and the conversation
            await newMessage.save();
            await conversation.save();
    
            res.status(201).json({ message: "Message sent successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
    
    getMessages: async (req, res) => {
        const { senderId, receiverId } = req.query;
    
        try {
            // Find the conversation between the two users
            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });
    
            if (!conversation) {
                return res.status(204).end();
            }
    
            res.status(200).json(conversation.messages);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },

    getConversations: async (req, res) => {    
        const { userId } = req.query;

        try {
            // Fetch all conversations involving the user
            const conversations = await Conversation.find({
                participants: userId,
            });
    
            // Extract participants Id
            const userIds = new Set();
            conversations.forEach(conversation => {
                conversation.participants.forEach(participant => {
                    if (participant !== userId) {
                        uniqueUserIds.add(participant);
                    }
                });
            });
    
            // Fetch user details for the unique IDs
            const users = await People.find(
                { _id: { $in: Array.from(userIds) } },
                { createdAt: 0, updatedAt: 0, __v: 0, email: 0 } // Exclude these fields
            );
    
            res.status(200).json({
                conversations,
                users,
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }    
}