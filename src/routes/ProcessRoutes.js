const router = require('express').Router();

const ProcessCtrl = require('../controllers/ProcessController');
const Auth = require('../middleware/Auth');

router.post('/create/:id', Auth, ProcessCtrl.createProcess);

router.get('/list-processes', ProcessCtrl.getProcesses);

router.get('/list-process/adopter', Auth, ProcessCtrl.getProcessesByAdopter);

router.get('/list-process/animal/:id', ProcessCtrl.getProcessByAnimal);

router.get('/list-process/owner', Auth, ProcessCtrl.getAnimalsInAdoptionProcess);

router.put('/update/:id', Auth, ProcessCtrl.updateProcess);

router.put('/cancel/:id', Auth, ProcessCtrl.cancelProcess);

router.put('/update-days/:id', ProcessCtrl.updateProcessDays);

module.exports = router;
