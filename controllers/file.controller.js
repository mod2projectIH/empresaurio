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
	.populate('file')
	
		.then(worker => {
			console.log(worker)
			res.render("files/upload", {
				worker,
				
			});
		})
		.catch(next);
};

module.exports.doUploadFile = (req, res, next) => {
	console.log(req.currentWorker._id + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
	const file = new File({
		type: req.body.type,
		description: req.body.type, 
		worker: req.currentWorker._id,
		file: req.file ? `/uploads/${req.file.filename}` : undefined
		
	});
	console.log(file)
	file
		.save()
		.then(file => {
			Worker.findByIdAndUpdate(req.currentWorker._id, {$set: {file: file.id}}, {new: true}, function(error, updatedDocument){
				console.log(updatedDocument)
				file.save()
			})
			console.log(`${file.description} has been created`);
			res.redirect("/");
		})
		.catch(error => console.log(error));
};

module.exports.doUploadFileDetails = (req, res, next) => {
	console.log(req.params.id + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + req.params.id)
	const file = new File({
		type: req.body.type,
		description: req.body.type, 
		worker: req.params.id,
		file: req.file ? `/uploads/${req.file.filename}` : undefined
		
	});
	console.log(file)
	file
		.save()
		.then(file => {
			Worker.findByIdAndUpdate(req.params.id, {$set: {file: file.id}}, {new: true}, function(error, updatedDocument){
				console.log(updatedDocument)
				file.save()
			})
			console.log(`${file.description} has been created`);
			res.redirect("/");
		})
		.catch(error => console.log(error));
};
