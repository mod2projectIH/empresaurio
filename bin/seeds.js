require("../config/db.config");

const mongoose = require("mongoose");
const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const Team = require("../models/team.model");
const File = require("../models/file.model");


      const superUser = new Worker({
        number: 1,
        lastName: "Superuser",
        firstName: "Superuser",
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
        .then(console.log(superUser))
        .catch(error => {
          throw new Error(`impossible to add the worker ${error}`);

        })


        const HR = new Worker({
          number: 2,
          lastName: "Human",
          firstName: "Resources",
          email: "HR@HR.com",
          password: "123123123",
          profilePic: "../public/images/hr.png",
          workTeam: "Human resource team",
          role: "Worker",
          isHR: true,
          break: false,
          currentState: "Working"
        });
        HR
          .save()
          .then(console.log(HR))
          .catch(error => {
            throw new Error(`impossible to add the worker ${error}`);


        })
      

        const regularWorker = new Worker({
          number: 3,
          lastName: "Worker",
          firstName: "Worker",
          email: "w@w.com",
          password: "123123123",
          profilePic: "../public/images/benito.png",
          workTeam: "Regular worker team",
          role: "Worker",
          isHR: false,
          break: false,
          currentState: "Working"
        });
        regularWorker
          .save()
          .then(console.log(regularWorker))
          .catch(error => {
            throw new Error(`impossible to add the worker ${error}`);

        })

        

        const regularWorker2 = new Worker({
          number: 4,
          lastName: "Worker2",
          firstName: "Worker2",
          email: "w@w2.com",
          password: "123123123",
          profilePic: "../public/images/benito.png",
          workTeam: "Regular worker team",
          role: "Worker",
          isHR: false,
          break: false,
          currentState: "Working"
        });
        regularWorker2
          .save()
          .then(console.log(regularWorker2))
          .catch(error => {
            throw new Error(`impossible to add the worker ${error}`);

        })

        
        