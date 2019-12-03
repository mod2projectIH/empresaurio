const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  }],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  }
}, { timestamps: true })

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;