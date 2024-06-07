const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  race: {
    type: String,
    required: true
  },

  sex: {
    type: String,
    required: true
  },

  age: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXY-Z5_TQmxJBj9rWmtaNOLz7hXKE079ITZg&s"
  },

  owner: { 
    type: mongoose.Types.ObjectId, 
    ref: 'user', 
    required: true 
  }
});

const Animal = mongoose.model('animal', AnimalSchema);
module.exports = Animal;
