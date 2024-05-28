const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'canceled'],
    default: 'pending'
  },
  days: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
});

const Process = mongoose.model('process', ProcessSchema);
module.exports = Process;
