const router = require('express').Router();

const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
const AnimalRoutes = require('./AnimalRoutes');
const ProcessRoutes = require('./ProcessRoutes');

router.use('/api/auth', AuthRoutes);

router.use('/api/users', UserRoutes);

router.use('/api/animals', AnimalRoutes);

router.use('/api/process', ProcessRoutes);

module.exports = router;