const Process = require('../models/Process');
const Animal = require('../models/Animals');
const User = require('../models/User');

exports.createProcessService = async (userId, animalId) => {
  const processAlreadyExists = await Process.findOne({ animal: animalId });

  if(processAlreadyExists && processAlreadyExists.status !== 'Cancelado') {
    throw new Error("Este animal já está em um processo de adoção!");
  }

  const animal = await Animal.findOne({ _id: animalId });

  return await Process.create({
    adopter: userId,
    animal: animalId,
    animalName: animal.name
  });
};

exports.getProcessesService = async () => {
  const processes = await Process.find();

  if(!processes || !processes.length) {
    throw new Error("Processos não encontrados");
  }

  return processes;
}

exports.getProcessesByAdopterService = async (userId) => {
  const processesByUser = await Process.find({ adopter: userId });

  if(!processesByUser || !processesByUser.length) {
    throw new Error("Processos não encontrados");
  }

  return processesByUser;
}

exports.getProcessByAnimalService = async (animalId) => {
  const processByAnimal = await Process.find({ animal: animalId });

  if(!processByAnimal || !processByAnimal.length) {
    throw new Error("Processo não encontrados");
  }

  return processByAnimal;
}

exports.getAnimalsInAdoptionProcessService = async (userId) => {
  const animalsByOwner = await Animal.find({ owner: userId });

  const animalIds = animalsByOwner.map(animal => animal._id);

  const processes = await Process.find({ animal: { $in: animalIds } });
  
  if(!processes || !processes.length) {
    throw new Error("Processos não encontrados");
  }

  return processes;
}

exports.updateProcessService = async (processId, userId, isCancel = false) => {
  const processToUpdate = await Process.findOne({ _id: processId, adopter: userId });
  const user = await User.findOne({ _id: userId });

  if(!processToUpdate) {
    throw new Error("Processo não encontrado!");
  }

  if (isCancel) {
    return await Process.findByIdAndUpdate(processId, {
      status: 'Cancelado',
    });
  }

  const sum = user.adopter + 1;

  await User.findByIdAndUpdate(userId, {
    adopter: sum
  });

  return await Process.findByIdAndUpdate(processId, {
    status: 'Concluido',
    days: 0
  });
};

exports.updateProcessDaysService = async (processId) => {
  const processToUpdate = await Process.findById({ _id: processId });

  if(!processToUpdate) {
    throw new Error("Processo não encontrado!");
  }

  if (processToUpdate.status === 'Concluido') {
    throw new Error("Os dias do processo não precisam ser atualizados, pois este processo já está concluido!");
  }

  const updateDays = Math.max(0, processToUpdate.days - 1);

  if (updateDays === 0) {
    return await Process.findByIdAndDelete(processId);
  } else {
    return await Process.findByIdAndUpdate(processId, {
      days: updateDays
    });
  }
};

exports.cancelExpiredAdoptionProcessesService = async () => {
  try {
    await Process.updateMany(
        { status: 'Pendente', days: { $gt: 0 } },
        { $inc: { days: -1 } }
    );

    return await Process.updateMany(
        { status: 'Pendente', days: { $lte: 0 } },
        { $set: { status: 'Cancelado' } }
    );
  } catch (error) {
      return error
  }
}