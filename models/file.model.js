const mongoose = require('mongoose');
require("./worker.model")

const fileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Drop','Holidays','Parenthood'],
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

const File = mongoose.model('File', fileSchema);

module.exports = File;