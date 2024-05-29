const router = require('express').Router();

const Auth = require('../middleware/Auth');
const UserCtrl = require('../controllers/UserController');

router.get('/list', UserCtrl.getUsers);

router.get('/list-by-email', UserCtrl.getUserByEmail);

router.put('/edit', Auth, UserCtrl.editProfile);

router.put('/change-password', Auth, UserCtrl.changePassword);

router.delete('/delete', Auth, UserCtrl.deleteUser);

module.exports = router;