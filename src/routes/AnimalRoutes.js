const router = require('express').Router();

const AnimalCtrl = require('../controllers/AnimalController');
const { validAnimal } = require('../middleware/Validation');

router.post('/create', validAnimal, AnimalCtrl.createAnimals);

module.exports = router;
