const router = require('express').Router();

const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
// const PostRoutes = require('./PostRoutes');
// const PetRoutes = require('./PetsRoutes');

router.use('/api/auth', AuthRoutes);

router.use('/api/users', UserRoutes);

// router.use('/api/posts', PostRoutes);

// router.use('/api/pets', PetRoutes);

module.exports = router;