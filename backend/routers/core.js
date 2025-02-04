const router = require('express').Router();
const coreController = require('../controllers/core');

router.get('/', coreController.getMainScreen);
router.get('/privacy-policy', coreController.getPrivacyPolicy);
router.get('/health', coreController.getHealthCheck);

module.exports = router;