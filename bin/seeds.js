require("../config/db.config");

const mongoose = require("mongoose");
const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const Team = require("../models/team.model");
const File = require("../models/file.model");



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
      profilePic: "../public/images/empresaurio.png",
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

        const contract = new Contract({
          worker: worker._id,
          contractType: "Undefined",
          testPeriod: false,
          workingTime: "Full-time",
          workerStartTime: Date.now(),
          workerEndTime: Date.now(),
          shifts: "Morning shift",
          restTime: 30
        });
        contract
          .save()
          .then(contract => {
            console.log(`Contract has been added to ${worker._id}`)

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
            workday.save()
            .then(workday=>{
              console.log(`Workday has been added to ${workday._id}`)

            }).catch(console.error);
          })
          .catch(console.error);
      })
      .catch(console.error);
  })
  .catch(error => {
    throw new Error(`impossible to add the worker ${error}`);
  })
