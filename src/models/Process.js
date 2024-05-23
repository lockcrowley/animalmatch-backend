const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const Process = mongoose.model('process', ProcessSchema);
module.exports = Process;
