const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/signUp', userController.signUp);
router.get('/signIn/:key', userController.signIn);
router.get('/search', userController.searchUsers);
router.get('/delete-user', userController.deleteUserPage);
router.post('/delete-user', userController.deleteUser);

module.exports = router;