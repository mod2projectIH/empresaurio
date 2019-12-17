
const Worker = require("../models/worker.model");

const mongoose = require("mongoose");


module.exports.details = (req, res, next) =>{
  const id = req.params.id


  Worker.findOne({_id: id})
  

  .then(worker=>{
    console.log(req.params.id)
    console.log(worker)
    res.render("hr/details", { worker: worker })



  }).catch(next)



}

module.exports.deployDetails = (req, res, next) =>{

const params = {firstName: req.params.firstName, lastName: req.params.lastName}


Worker.findById(req.params.id)
.then(worker=>{


  res.send({params})
}).catch(error => console.error(error))


  
}

