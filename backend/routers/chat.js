const router = require('express').Router();
const chatController = require('../controllers/chatController');

router.post('/sendMessage', chatController.createMessage);
router.get('/getMessages', chatController.getMessages);
router.get('/getConversations', chatController.getConversations)

module.exports = router;