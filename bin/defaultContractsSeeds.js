require("../config/db.config");

const mongoose = require("mongoose");
const defaultContracts = require("../models/defaultContract");

const undefined = new defaultContracts({
	contractType: "Undefined",
	testPeriod: false,
	workingTime: "Full-time",
	workerStartTime: 8,
	workerEndTime: 17,
	shifts: "Morning shift",
	restTime: 30,
});

const temporary = new defaultContracts({
	contractType: "Temporary",
	testPeriod: false,
	workingTime: "Full-time",
	workerStartTime: 8,
	workerEndTime: 17,
	shifts: "Morning shift",
	restTime: 30,
});

const internship = new defaultContracts({
	contractType: "Internship",
	testPeriod: false,
	workingTime: "Part time",
	workerStartTime: 8,
	workerEndTime: 13,
	shifts: "Morning shift",
	restTime: 30,
});

const evening = new defaultContracts({
	contractType: "Undefined",
	testPeriod: false,
	workingTime: "Full-time",
	workerStartTime: 8,
	workerEndTime: 17,
	shifts: "Morning shift",
	restTime: 30,
});

Promise.all([
	undefined.save(),
	temporary.save(),
	internship.save(),
	evening.save(),
])
	.then(contract => {
		console.log(`This type of contract has been created ${contract}`);
	})
	.catch(error => {
		throw new Error(`impossible to add the worker ${error}`);
	});
