const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const File = require("../models/file.model");
const ContractsList = require("../constants/contracts");
const RolesList = require("../constants/roles");
const StatesList = require("../constants/states");
const mongoose = require("mongoose");
// const mailer = require("../config/mailer.config")

module.exports.uploadFile = (req, res, next) => {
	const id = req.params.id;
	Worker.findOne({ _id: id })
		.then(worker => {
			res.render("files/upload", {
				worker,
			});
		})
		.catch(next);
};

module.exports.doUploadFile = (req, res, next) => {
	const file = new File({
		type: req.body.type,
		file: req.file,
	});
	file
		.save()
		.then(file => {
			console.log(`${file.name} has been created`);
			res.redirect("workers/details");
		})
		.catch(error => console.log(error));
};
