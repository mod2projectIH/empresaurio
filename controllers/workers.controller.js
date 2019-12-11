const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const ContractsList = require("../constants/contracts")
const RolesList = require("../constants/roles")
const StatesList = require("../constants/states")

const mongoose = require("mongoose");
// const mailer = require("../config/mailer.config")
module.exports.new = (_, res) => {
  res.render('workers/new', {
    worker: new Worker(),
    ContractsList,
    RolesList,
    StatesList
  })
}
module.exports.create = (req, res, next) => {
  const worker = new Worker({
    number: req.body.number,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.file ? `/uploads/${req.file.filename}` : undefined,
    workTeam: req.body.workTeam,
    role: req.body.role,
    currentState: req.body.currentState,
    contract: req.body.contract,
    isHR: req.body.isHR
  })
  worker.save()
    .then((worker) => {
      // mailer.sendValidateEmail(worker)
      res.redirect('/workers/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('workers/new', {
          worker,
          error: error.errors,
          ContractsList,
          RolesList,
          StatesList
        })
      } else if (error.code === 11000) {
        res.render('workers/new', {
          worker: {
            ...worker,
            password: null
          },
          ContractsList,
          RolesList,
          StatesList,
          genericError: 'Worker exists'
        })
      } else {
        next(error);
      }
    })
}

module.exports.index = (req, res, next) => {
  res.render("workers/index")


}





module.exports.login = (req, res, next) => {
  res.render("workers/login");
};

module.exports.doLogin = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.render("workers/login", {
      worker: req.body
    });
  }
  Worker.findOne({
    email
  }).then(worker => {
    if (!worker) {
      res.render("workers/login", {
        worker: req.body,
        error: {
          password: "Password is not valid"
        }
      });
    } else {
      return worker.checkPassword(password).then(match => {
        if (!match) {
          res.render("workers/login", {
            worker: req.body,
            error: {
              password: "Password is not valid"
            }
          });
        } else {
          req.session.worker = worker
          req.session.genericSuccess = "You are logged logged in. Welcome :)"
          res.redirect("/")

        }
      });
    }
  }).catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("workers/login", {
        worker: req.body,
        error: error.error

      })
    } else {
      next(error)
    }



  })
};

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/login")

}