const { 
  createProcessService,
  getProcessesService,
  getProcessesByAdopterService,
  getProcessByAnimalService,
  getAnimalsInAdoptionProcessService,
  updateProcessService,
  updateProcessDaysService
} = require('../services/ProcessService');

exports.createProcess = async (req, res) => {
  try {
    const userId = req.user._id;
    const animalId = req.params.id

    const createProcess = await createProcessService(userId, animalId);

    return res.status(200).json({ createProcess });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getProcesses = async (req, res) => {
  try {
    const getProcesses = await getProcessesService();

    return res.status(200).json({ getProcesses });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getProcessesByAdopter = async (req, res) => {
  try {
    const userId = req.user._id;

    const processes = await getProcessesByAdopterService(userId);

    return res.status(200).json({ processes });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getProcessByAnimal = async (req, res) => {
  try {
    const animalId = req.params.id

    const getProcess = await getProcessByAnimalService(animalId);

    return res.status(200).json({ getProcess });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getAnimalsInAdoptionProcess = async (req, res) => {
  try {
    const userId = req.user._id;

    const processes = await getAnimalsInAdoptionProcessService(userId);

    return res.status(200).json({ processes });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.updateProcess = async (req, res) => {
  try {
    const processId = req.params.id;

    const userId = req.user._id;

    await updateProcessService(processId, userId);

    return res.status(200).json({ message: 'Processo atualizado com sucesso para concluido!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.updateProcessDays = async (req, res) => {
  try {
    const processId = req.params.id;

    await updateProcessDaysService(processId);

    return res.status(200).json({ message: 'Processo atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.cancelProcess = async (req, res) => {
  try {
    const processId = req.params.id;
    const userId = req.user._id;
    const isCancel = true;

    await updateProcessService(processId, userId, isCancel);

    return res.status(200).json({ message: 'Processo atualizado com sucesso para cancelado!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
