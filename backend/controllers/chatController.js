const Message = require('../models/chatTesting');
const People = require('../models/People');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
    createMessage: async(req, res) => {

        const newPerson = new Message({
            content: req.body.content,
            sender: req.body.sender,
            sendAt: req.body.sendAt,
            receiver: req.body.receiver
        });

        try {
            await newPerson.save();
            res.status(201).json({message: "Message created successfully"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    getMessages: async (req, res) => {
        const { userId, currentUserId } = req.query;
        // console.log(userId);
        // console.log(currentUserId);

        try {
            const messages = await Message.find({
                $or: [
                    { sender: userId, receiver: currentUserId },
                    { sender: currentUserId, receiver: userId }
                ]
            }).sort({ sendAt: 1 });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getConversations: async (req, res) => {
        const { userId } = req.query;

        try {
            const conversations = await Message.find({
                $or: [
                    { sender: userId },
                    { receiver: userId }
                ]
            });

            // Extract unique IDs of other participants
            const uniqueIds = new Set();
            conversations.forEach(message => {
                if (message.sender !== userId) {
                    uniqueIds.add(message.sender);
                }
                if (message.receiver !== userId) {
                    uniqueIds.add(message.receiver);
                }
            });

            // Find names for the unique IDs
            const users = await People.find({ _id: { $in: Array.from(uniqueIds) } }, { name: 1 });
            const results = users.map(user => ({
                id: user._id,
                name: user.name
            }));

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}