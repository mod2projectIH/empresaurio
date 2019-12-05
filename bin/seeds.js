require("../config/db.config");

const mongoose = require("mongoose");
const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const Team = require("../models/team.model");
const File = require("../models/file.model");

const workerId = []


Promise.all([
  Worker.deleteMany(), 
  Contract.deleteMany(), 
  Workday.deleteMany()])
  .then(() => {
    const superUser = new Worker({
      number: 1,
      name: {
        lastName: "Superuser",
        firstName: "Superuser"
      },
      email: "superuser@superuser.com",
      password: "123123123",
      profilepic: "../public/images/empresaurio.png",
      workTeam: "Empresaurio",
      role: "Empresaurio",
      isHR: true,
      break: false,
      currentState: "Working"
    });
    superUser
      .save()
      .then(worker => {
        console.log(`A new worker has been created ${worker.number}`)
         workerId.push(worker._id) 

        const contract = new Contract({
          worker: worker._id,
          contractType: "Undefined",
          testPeriod: false,
          workingTime: "Full-time",
          workerStartTime: Date.now(),
          workerEndTime: Date.now(),
          shifts: "Morning Shift",
          restTime: 30
        });
        contract
          .save()
          .then(contract => {
            const workday = new Workday({
              contract: contract.worker,
              startTime: Date.now(),
              endTime: Date.now(),
              workedHours: 8,
              worked: true,
              break: true,
              dailybreakTime: {
                start: Date.now(),
                finish: Date.now()
              }
            });
            workday.save();
          })
          .catch(console.error);
      })
      .catch(console.error);
  })
  .catch(error => {
    throw new Error(`impossible to add the worker ${error}`);
  })
