const mongoose = require('mongoose');

const workdaySchema = new mongoose.Schema({
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
  },
  worked:{
    type:Boolean,
    required: true,
    default: false
  },
  workerStartTime: { //creo que debería ir en contrato
    type: Number,
    required: true
  },
  workerEndTime: { //creo que debería ir en contrato
    type: Number,
    required: true
  },
  break: {
    type: Boolean,
    required: true
  },
  workerBreakTime: {
    type: Number,
    required: true
  },
  breakTime: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const Workday = mongoose.model('Workday', workdaySchema);

module.exports = Workday;