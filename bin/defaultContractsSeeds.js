require("../config/db.config");

const mongoose = require("mongoose");
const defaultContracts = require("../models/defaultContract")

defaultContracts.deleteMany()

.then(() => {
  const undef = new defaultContracts({
    name: "1",

    contractType: "Undefined",  
    testPeriod: false, 
    workingTime: "Full-time",
    workerStartTime: 8, 
    workerEndTime: 17, 
    shifts: "Morning shift", 
    restTime: 30
  });
  
  
  const temporary = new defaultContracts({
    name: "2",

    contractType: "Temporary",  
    testPeriod: false, 
    workingTime: "Full-time",
    workerStartTime: 8, 
    workerEndTime: 17, 
    shifts: "Morning shift", 
    restTime: 30
  });
  
  
  const internship = new defaultContracts({
    name: "3",

    contractType: "Internship",  
    testPeriod: false, 
    workingTime: "Part time",
    workerStartTime: 8, 
    workerEndTime: 13,  
    shifts: "Morning shift", 
    restTime: 30
  });
  
  const evening = new defaultContracts({
    name: "4", 

    contractType: "Undefined",  
    testPeriod: false, 
    workingTime: "Full-time",
    workerStartTime: 8, 
    workerEndTime: 17, 
    shifts: "Morning shift", 
    restTime: 30
  })


  Promise.all([
    undef.save(), 
    temporary.save(), 
    internship.save(), 
    evening.save()


  ]).then(contract=>{
    console.log(`This type of contract has been created ${contract}`)












})  .catch(error => {
  throw new Error(`impossible to add the worker ${error}`);
}).catch(error=>{
  throw new Error(`impossible to add the worker ${error}`);

})




})



  