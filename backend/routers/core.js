const router = require('express').Router();
const coreController = require('../controllers/core');

router.get('/', coreController.getMainScreen);
router.get('/privacy-policy', coreController.getPrivacyPolicy);
router.get('/health', coreController.getHealthCheck);
router.get('/against-CSAE', coreController.getCSAEPolicy);

module.exports = router;