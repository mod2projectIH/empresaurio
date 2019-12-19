const mongoose = require("mongoose");
require("./contract.model")
require("./worker.model")
const workdaySchema = new mongoose.Schema(
  {
    
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      // required: true
    },
    day: {
      type: Date,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date
    },

    workedHours: {
      type: Date
    },
    break: {
      type: Boolean,
      deafault: false
    },
    dailyBreakTime: {
      start: {
        type: Date
      },
      finish: {
        type: Date
      }
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true
    },

  },
  { timestamps: true }
);

const Workday = mongoose.model("Workday", workdaySchema);

module.exports = Workday;
