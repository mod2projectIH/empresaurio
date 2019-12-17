const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const ContractsList = require("../constants/contracts")
const RolesList = require("../constants/roles")
const StatesList = require("../constants/states")

module.exports.index = (req, res, next) => {
  const sorter = {startTime:-1}
  Workday.find().sort(sorter).limit(10)
    .populate('worker')
  .then(workdays => {
    res.render("workdays/index", {
      workdays
    })
  })
}