const router = require('express').Router();

const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
const AnimalRoutes = require('./AnimalRoutes');
// const PetRoutes = require('./PetsRoutes');

router.use('/api/auth', AuthRoutes);

router.use('/api/users', UserRoutes);

router.use('/api/animal', AnimalRoutes);

// router.use('/api/pets', PetRoutes);

module.exports = router;