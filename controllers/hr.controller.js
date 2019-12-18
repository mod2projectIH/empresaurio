const Worker = require("../models/worker.model");
const File = require("../models/file.model");

const mongoose = require("mongoose");

module.exports.details = (req, res, next) => {
	const id = req.params.id;

	File.find({worker: id})
    .populate("worker")

		.then(files => {
			files.forEach(files=> console.log(files.worker._id))
			
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


module.exports.deleteWorker = (req, res, next) => {
console.log("ENTRAAAAAAAAAAAAAAAAAAAAAA")

	

		const id = req.params.id
		
		 
		Worker.findByIdAndRemove(id)
		.then(worker=>{
			console.log(`This worker has been removed => ${worker.firstName} ${worker.lastName} `)
			res.redirect("/")
		}).catch(error=>{
			next(console.log(error))
		})
		
		
		

}