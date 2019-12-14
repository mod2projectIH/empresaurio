const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("./contract.model");
const ContractsList = require("../constants/contracts")
const StatesList = require("../constants/states")
const Worday = require ("../models/workday.model")

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const workerSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [3, "First name needs to be at least 3 characters long"]
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name needs to be at least 3 characters long"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Email is invalid"]
    },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [8, "At least 8 characters are required"]
      // Add the requirement to include symbols or uppercase???
    },


    profilePic: { type: String, required: true },
    workTeam: { 
      type: String, 
      default:null
     },
    role: {
      type: String,
      enum: ["Worker", "Team leader", "Empresaurio"],
      required: true
    },
    isHR: {
      type: Boolean,
      default: false
    },
    workday:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workday"
    },
    isWorking: {
      type: Boolean,
      default: false
    },
    break: {
      type: Boolean,
      default: false
    },
    currentState: {
      type: String,
      enum: StatesList,
      default: "Working"
    }, 
    isWorking: {
      type: Boolean, 
      default: false
      
    }, 
  },{ timestamps: true }
);

// Password configuration


workerSchema.pre('save', function (next) {
  const worker = this;

  if (worker.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(worker.password, salt)
          .then(hash => {
            worker.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

workerSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}


//Virtuals

workerSchema.virtual("contract", {
  ref: "Contracts",
  localField: "_id",
  foreignField: "worker",
  justOne: true
});

// workerSchema.virtual("workday", {
//   ref: "Workdays",
//   localField: "_id",
//   foreignField: "worker",
//   justOne: true
// });

const Worker = mongoose.model("Worker", workerSchema);
module.exports = Worker;
