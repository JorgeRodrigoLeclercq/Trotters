const router = require('express').Router();
const peopleController = require('../controllers/peopleController');

router.post('/register', peopleController.createPeople)
router.post('/login', peopleController.loginPeople)
router.get('/:key', peopleController.getPeople)
router.get('/search/:key', peopleController.searchPeople)

module.exports = router;