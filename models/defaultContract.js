const mongoose = require("mongoose");


const defaultContract = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    unique: true
  }, 
  contractType: {
    type: String,
    required: true,
    enum: ["Undefined", "Temporary", "Internship"]
  },
  testPeriod: {
    type: Boolean,
    default: true,
    required: true
  },

  workingTime: {
    type: String,
    enum: ["Part time", "Full-time", "Hourly"],
    required: true
  },
  workerStartTime: {

    type: Number,
    required: true, 
  },
  workerEndTime: {
    type: Number,
    required: true
  },
  shifts: {
    type: String,
    enum: ["Morning shift", "Evening shift", "Night shift"],
    required: true
  },
  restTime: {
    type: Number,
    default: 0
  }
});

const DefaultContract = mongoose.model("Default_Contract", defaultContract);
module.exports = DefaultContract;
