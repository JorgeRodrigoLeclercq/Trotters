const router = require('express').Router();
const peopleController = require('../controllers/peopleController');

router.post('/register', peopleController.createPeople)
router.post('/login', peopleController.loginPeople)
router.get('/:id', peopleController.getPeople)
router.get('/search/:key', peopleController.searchPeople)

module.exports = router;