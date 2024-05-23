const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Mongo connection established');
    return;
  } catch (error) {
    return error;
  }
}

module.exports = connectDB;
