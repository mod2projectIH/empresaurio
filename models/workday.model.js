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
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },

    // Añadir algún modo de validar la fecha
    //de salida en correspondecia con la entrada.
    // Para saber que se ha cumplido la jornada.

    //A lo mejor el typo Date no es el mejor para las horas.
    //Conversión a UTC => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC

    endTime: {
      type: Date
    },

    workedHours: {
      type: Number,
      default: 0
    },
    break: {
      type: Boolean,
      deafault: false
    },
    dailyBreakTime: {
      type: {
        start: {
          type: Date
        },
        finish: {
          type: Date
        }
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
