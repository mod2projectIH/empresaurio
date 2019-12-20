const Worker = require("../models/worker.model");
const File = require("../models/file.model");
const Workday = require("../models/workday.model")
const ContractsList = require("../constants/contracts")
const RolesList = require("../constants/roles")
const StatesList = require("../constants/states")

const mongoose = require("mongoose");
module.exports.workersIndex = (req, res, next) => {
  Worker.find().sort({number : 1})
  .then(workers => {    
      res.render("hr/workers", { workers });

    }).catch(next)
}
module.exports.details = (req, res, next) => {
	const id = req.params.id;

	File.find({worker: id})
    .populate("worker")

		.then(files => {			
				res.render("hr/details", { files, worker: files.worker });
			}).catch(next)
		
};

module.exports.deployDetails = (req, res, next) => {
	const params = {
		firstName: req.params.firstName,
		lastName: req.params.lastName,
	};

	Worker.findById(req.params.id)
		.then(worker => {
			res.send({ params });
		})
		.catch(error => console.error(error));
};


module.exports.uploadFiles = (req, res, next) => {
	

	Worker.findById(req.params.id)
		.then(worker => {
			res.send({ worker });
		})
		.catch(error => console.error(error));
};
////////////////////////////
module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  
  Worker.findById(id)
    .then(worker => {
      res.render("hr/edit", { worker : worker , ContractsList,
				RolesList,
				StatesList
				});
    })
    .catch(error => {
      next(error => console.error(error));
    });
};


module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;
 
    Worker.findByIdAndUpdate(id, req.body)
      .then(worker => {
        console.log(worker);
        res.redirect("/workers");
      })
      .catch(error => {
        next(error => console.error(error));
      });

};
////////////////////////////


module.exports.deleteWorker = (req, res, next) => {

	

		const id = req.params.id
		
		 
		Worker.findByIdAndRemove(id)
		.then(worker=>{
			console.log(`This worker has been removed => ${worker.firstName} ${worker.lastName} `)
			res.redirect("/")
		}).catch(error=>{
			next(console.log(error))
    })
    Workday.deleteMany({worker:id})
      .then(workdays =>{
        console.log(`This worker has been removed => ${worker.firstName} ${worker.lastName} `)
			  res.redirect("/")
      }).catch(error=>{
			next(console.log(error))
    })
    
		
		
		

}
