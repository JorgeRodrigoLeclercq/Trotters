const router = require('express').Router();
const userController = require('../controllers/user');
const { upload } = require('../middleware/multer'); 

router.post('/signUp', upload, userController.signUp);
router.get('/signIn/:key', userController.signIn);
router.get('/search/:key', userController.searchUsers);

module.exports = router;