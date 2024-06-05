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

  phone: {
    type: String,
    required: true
  },

  residence: {
    type: String,
    required: true
  },

  wantToAdopt: {
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

  image: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
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