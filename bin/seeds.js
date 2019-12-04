require("../config/db.config");

const mongoose = require("mongoose");
const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const Team = require("../models/team.model");
const File = require("../models/file.model");

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
  currentState: "Working",
  contract: "",
  workday: new Workday({
    contract: new Contract({
      // worker:
      contractType: "Undefined",
      testPeriod: false,
      workingTime: "Full-time",
      workerStartTime: Date.now(),
      workerEndTime: Date.now(),
      shifts: "Morning Shift",
      restTime: 30
    }),
    endTime: Date.now(),
    workedHours: 8,
    worked: true,
    break: false,
    dailyBreakTIme: {
      start: Date.now(),
      finish: Date.now()
    }
  })
});

