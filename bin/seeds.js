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

      