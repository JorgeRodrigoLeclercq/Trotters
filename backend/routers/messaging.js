const router = require('express').Router();
const messagingController = require('../controllers/messaging');

router.post('/sendMessage', messagingController.sendMessage);
router.get('/getMessages', messagingController.getMessages);
router.get('/getConversations', messagingController.getConversations);

module.exports = router;