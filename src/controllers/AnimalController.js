const {
  createAnimalsService,
  getAllAnimalsService,
  getAnimalByNameService,
  getAnimalByUserService,
  editAnimalsService,
  deleteAnimalsService
} = require('../services/AnimalService');

exports.createAnimals = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;

    const createAnimal = await createAnimalsService(data, userId);

    return res.status(200).json({ createAnimal });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await getAllAnimalsService();

    return res.status(200).json({ animals });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.getAnimalByName = async (req, res) => {
  try {
    const data = req.body;

    const animalByName = await getAnimalByNameService(data);

    return res.status(200).json({ animalByName });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.getAnimalByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const animalsByUser = await getAnimalByUserService(userId);

    return res.status(200).json({ animalsByUser });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }   
};

exports.editAnimals = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user._id;
    const animalId = req.params.id;

    await editAnimalsService(data, userId, animalId);

    return res.status(200).json({ message: "Animal atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.deleteAnimal = async (req, res) => {
  try {
    const userId = req.user._id;
    const animalId = req.params.id;

    await deleteAnimalsService(userId, animalId);

    return res.status(200).json({ message: "Animal deletado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}