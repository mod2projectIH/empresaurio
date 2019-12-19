const mongoose = require('mongoose');
require("./worker.model")

const fileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Drop','Holidays','Parenthood'],
    required: true
  },
  description: {
    type: String, 
    required: true
  }, 
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  },
  file: {
    type: String,
    required: true
  }
}, { timestamps: true })

const File = mongoose.model('Files', fileSchema);

module.exports = File;