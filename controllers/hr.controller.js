const Worker = require("../models/worker.model");

const mongoose = require("mongoose");

module.exports.details = (req, res, next) => {
	const id = req.params.id;

	Worker.findOne({ _id: id })
    .populate("file")
    

		.then(worker => {
     console.log(worker.file.type)
			
			res.render("hr/details", { worker: worker, file: worker.file });
		})
		.catch(next);
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
