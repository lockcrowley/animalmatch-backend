const router = require('express').Router();

const AuthCtrl = require('../controllers/AuthController');
const { validRegister } = require('../middleware/Validation');

router.post('/create', validRegister, AuthCtrl.createUser);

router.post('/login', AuthCtrl.userLogin);

router.post('/logout', AuthCtrl.userLogout);

router.patch('/forgot-password', AuthCtrl.forgotPassword);

router.patch('/reset-password', AuthCtrl.resetPassword)

router.post('/refresh_token', AuthCtrl.createToken);

module.exports = router;
