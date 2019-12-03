const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workers",
    required: true
  },

  contractType: {
    type: String,
    required: true,
    enum: ["Undefined", "Temporary", "Internship", "Freelance"]
  },
  testPeriod: {
    type: Boolean,
    default: true,
    required: true
  },

  //Tipo de jornada // POPULATE
  workingTime: {
    type: String,
    enum: ["Part time", "Full-time", "Hourly"],
    required: true
  },
  workerStartTime: {
    //Podríamos añadir rangos????

    type: Number,
    required: true
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

const Contract = mongoose.model("Contract", contractSchema);
module.exports = Contract;
