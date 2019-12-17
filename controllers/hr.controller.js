const Worker = require("../models/worker.model");
const File = require("../models/file.model");

const mongoose = require("mongoose");

module.exports.details = (req, res, next) => {
	const id = req.params.id;

	File.find({worker: id})
    .populate("worker")
    
		// .then(file => {
		// 	File.find({worker: id})
			.then(files=>{
				res.render("hr/details", { files, worker:files.worker });

			}).catch(next)
		// })
// 		.catch(next);
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
