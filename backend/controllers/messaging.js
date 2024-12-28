const { Message, Conversation } = require('../models/messaging');
const { User } = require('../models/user'); 

module.exports = {
    sendMessage: async (req, res) => {
        const { content, senderId, receiverId } = req.body;

        try {
            // Create a new message
            const newMessage = new Message({
                content,
                senderId,
                receiverId
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

            // Send response
            res.status(201).json({ _id: newMessage._id });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    
    getMessages: async (req, res) => {
        const { currentUserId, otherUserId } = req.query;
        
        try {
            // Find the conversation between the two users
            const conversation = await Conversation.findOne({
                participants: { $all: [currentUserId, otherUserId] },
            });
    
            if (!conversation) {
                return res.status(204).end();
            }  

            // Send response
            res.status(200).json(conversation.messages);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getConversations: async (req, res) => {
        const userId = req.params.key;
    
        try {
            // Fetch all conversations involving the user
            const conversations = await Conversation.find({
                participants: userId,
            });
    
            if (conversations.length === 0) {
                return res.status(204).end();
            }
            
            // Extract participant IDs (excluding current user)
            const userIds = new Set();
            conversations.forEach(conversation => {
                conversation.participants.forEach(participant => {
                    if (participant !== userId) {
                        userIds.add(participant);
                    }
                });
            });
    
            // Fetch user details for the unique IDs
            const users = await User.find(
                { _id: { $in: Array.from(userIds) } }
            );
    
            // Combine user details with the last message
            const result = conversations.map(conversation => {
                const otherUserId = conversation.participants.find(participant => participant !== userId);
                const user = users.find(user => user._id.toString() === otherUserId);
    
                // Get the last message from the messages array
                const lastMessage = conversation.messages[conversation.messages.length - 1];
    
                return {
                    _id: user._id,
                    name: user.name,
                    profileImage: user.profileImage,
                    lastMessage: {
                        senderId: lastMessage.senderId,
                        content: lastMessage.content,
                        createdAt: lastMessage.createdAt
                    }
                };
            });
            
            // Send response
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }  
    }    
}