const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false
  },

  hashtags: [{
    type: String, 
    required: false
  }],

  address: AddressSchema,
  resetToken: {
    type: String,
    default: ""
  },

  animals: [{
    type: mongoose.Types.ObjectId, 
    ref: 'animal'
  }],

  image: {
    type: String,
    default: ""
  },

  isOng: {
    type: Boolean,
    default: false
  },

  adoptedAnimals: {
    type: Number,
    default: 0
  },

  resetToken: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('user', UserSchema);