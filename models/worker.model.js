const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require('./contract.model')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const workerSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: {
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

      }
    }
  }, 
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],  
    trim: true, 
    lowercase: true, 
    match:[EMAIL_PATTERN, "Email is invalid"]

  }, 
  password: {
    type: String, 
    required: [true, "A password is required"],
    minlength: [8, "At least 8 characters are required"], 
     // Add the requirement to include symbols or uppercase???
  }, 

  /////////POPULATE

  profilePic: {type: String, required: true}, 
  workTeam: {type: String, required: true} ,
  role: {
    type: String, 
    enum: ["worker", "Team leader", "Empresaurio"], 
    required: true 
  }, 
  isHR: {
    type: Boolean, 
    default: false, 

  }, 
  break:{
    type: Boolean, 
    default: false
  }, 
  currentState: {
    type: String, 
    enum: ["Working", "Down time", "Holidays", "Fired", "Left the company"], 

  },
  
  /////////////////POPULATE
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contracts", 
    required: true


  }
});


const Worker = mongoose.model('Worker', workerSchema)
module.exports = Worker




////////////////////////
