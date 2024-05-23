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
  age: {
    type: Number,
    required: true
  },
  adoptionProcess: [{
    type: mongoose.Types.ObjectId, 
    ref: 'process'
  }]
});

const Animal = mongoose.model('animal', AnimalSchema);
module.exports = Animal;
