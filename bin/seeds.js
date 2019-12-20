require("../config/db.config");

const mongoose = require("mongoose");
const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const Team = require("../models/team.model");
const File = require("../models/file.model");
const faker = require('faker')

const superUser = new Worker({
	number: 1,
	lastName: "Superuser",
	firstName: "Superuser",
	email: "superuser@superuser.com",
	password: "123123123",
	profilePic: "https://image.shutterstock.com/image-vector/dino-dressed-tuxedo-anthropomorphic-illustration-260nw-631393481.jpg",
	workTeam: "Empresaurio",
	role: "Empresaurio",
	
	isHR: true,
	break: false,
	currentState: "Working",
});
superUser
	.save()
	.then(console.log(superUser))
	.catch(error => {
		throw new Error(`impossible to add the worker ${error}`);
	});

const HR = new Worker({
	number: 2,
	lastName: "Human",
	firstName: "Resources",
	email: "HR@HR.com",
	password: "123123123",
	profilePic: "https://cdn3.f-cdn.com/contestentries/1386480/30568225/5b6731e0f1b4f_thumb900.jpg",
	workTeam: "Human resource team",
	role: "Worker",
	
	isHR: true,
	break: false,
	currentState: "Working",
});
HR.save()
	.then(console.log(HR))
	.catch(error => {
		throw new Error(`impossible to add the worker ${error}`);
	});



	const workerIds = []
	Promise.all([
		Worker.deleteMany(),
		Workday.deleteMany(),
	])
		.then(() => {
			for (let i = 0; i < 10; i++) {
				const workers = new Worker({
					number: faker.random.number(),
					lastName: faker.name.lastName(),
					firstName: faker.name.firstName(),
					email: faker.internet.email(),
					password: '123123123',
					profilePic: faker.internet.avatar(),
					role: "Worker",
					isHR: false,
					workTeam: "Development" 
					
				})
			
	
				workers.save()
					.then(worker => {
						console.log(worker.firstName + worker.lastName)
						workerIds.push(worker._id)
	
						for(let j = 0; j < 10; j++) {
							const workdays = new Workday({
								day: "2019-12-21T08:00:44.165Z",
								startTime: "2019-12-21T08:00:44.165Z", 
								worker: worker._id
							})
	
							workdays.save()
								
						}
					})
					.catch(console.error)
			}
		}).catch(console.error)