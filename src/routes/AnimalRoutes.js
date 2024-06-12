const router = require('express').Router();

const AnimalCtrl = require('../controllers/AnimalController');
const Auth = require('../middleware/Auth');
const { validAnimal } = require('../middleware/Validation');

router.post('/create', Auth, validAnimal, AnimalCtrl.createAnimals);

router.get('/list-animals', AnimalCtrl.getAllAnimals);

router.get('/list-animal/name', AnimalCtrl.getAnimalByName);

router.get('/animals-to-adopte', Auth, AnimalCtrl.getAnimalsToAdopte);

router.get('/list-user-animals', Auth, AnimalCtrl.getAnimalByUser);

router.put('/edit-animal/:id', Auth, AnimalCtrl.editAnimals);

router.delete('/delete/:id', Auth, AnimalCtrl.deleteAnimal);

module.exports = router;
