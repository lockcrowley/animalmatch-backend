const mongoose = require('mongoose');
const { format } = require('date-fns')

const newDate = format(new Date(), 'yyyy-MM-dd:HH:mm:ss')

const ProcessSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'concluded', 'canceled'],
    default: 'pending'
  },
  days: {
    type: Number,
    default: 14
  },

  createdAt: {
    type: Date,
    default: newDate
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
