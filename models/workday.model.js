const mongoose = require('mongoose');
require("./contract.model")
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

  // Añadir algún modo de validar la fecha 
  //de salida en correspondecia con la entrada.  
  // Para saber que se ha cumplido la jornada. 


  endTime: {
    type: Date,
  },

  workedHours:{
    type: Number, 
  }, 
  worked:{
    type:Boolean,
    required: true,
    default: false
  },
  
  break: {
    type: Boolean,
    required: true
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

}
  // [{
  //   type:_
  //   }

  //   type: Number,
  //   required: true
  // }]
}, { timestamps: true })

const Workday = mongoose.model('Workday', workdaySchema);

module.exports = Workday;