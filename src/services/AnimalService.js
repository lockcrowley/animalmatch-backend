const Animal = require('../models/Animals');

exports.createAnimalsService = async (data, userId) => {
  const { name, type, race, sex, age, description } = data;

  return await Animal.create({
    name,
    type,
    race,
    sex,
    age,
    description,
    owner: userId
  });
};

exports.getAllAnimalsService = async () => {
  const animals = await Animal.find();

  if(!animals || !animals.length) {
    throw new Error("Animal não encontrado");
  }

  return animals;
}

exports.getAnimalsToAdopteService = async (userId) => {
  const animals = await Animal.find({ owner: { $ne: userId } });

  if(!animals || !animals.length) {
    throw new Error("Animais não encontrados");
  }

  return animals;
}

exports.getAnimalByNameService = async (data) => {
  const animal = await Animal.findOne({ name: data.name });

  if(!animal) {
    throw new Error("Animal não encontrado");
  }

  return animal;
}

exports.getAnimalByUserService = async (userId) => {
  const animal = await Animal.find({ owner: userId });

  if (!animal || !animal.length) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }
  
  return animal;
}

exports.editAnimalsService = async (data, userId, animalId) => {
  const { name, type, race, sex, age, image } = data;

  const animal = await Animal.findOne({ _id: animalId, owner: userId });
    
  if (!animal) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }

  return await Animal.findByIdAndUpdate(animalId, {
    name, 
    type, 
    race,
    sex,
    age, 
    image
  });
}

exports.deleteAnimalsService = async (userId, animalId) => {
  const animal = await Animal.findOne({ _id: animalId, owner: userId });

  if (!animal) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }

  return await Animal.findByIdAndDelete({_id: animalId});
}
