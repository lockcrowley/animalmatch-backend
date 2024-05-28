const Animal = require('../models/Animals');

exports.createAnimalsService = async (data, userId) => {
  const { name, type, race, age } = data;

  return await Animal.create({
    name,
    type,
    race,
    age,
    owner: userId
  });
};

exports.getAllAnimalsService = async () => {
  const animals = await Animal.find();

  if(!animals) {
    throw new Error("Animal não encontrado");
  }

  return animals;
}


exports.getAnimalByNameService = async (data) => {
  const animal = await Animal.find({ name: data.name });

  if(!animal) {
    throw new Error("Animal não encontrado");
  }

  return animal;
}

exports.getAnimalByUserService = async (userId) => {
  const animal = await Animal.find({ owner: userId });

  if (!animal) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }
  
  return animal;
}

exports.editAnimalsService = async (data, userId, animalId) => {
  const { name, type, race, age, image } = data;

  const animal = await Animal.findOne({ _id: animalId, owner: userId });
    
  if (!animal) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }

  const updatedAnimal = await animal.save({
    name, 
    type, 
    race, 
    age, 
    image
  });
  
  return updatedAnimal;
}

exports.deleteAnimalsService = async (userId, animalId) => {
  const animal = await Animal.findOne({ _id: animalId, owner: userId });

  if (!animal) {
    throw new Error('Animal não encontrado ou não pertence a este usuário');
  }

  return await Animal.findByIdAndDelete({_id: animalId});
}
