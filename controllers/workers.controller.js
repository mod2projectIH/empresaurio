const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");

const mongoose = require("mongoose");

// const mailer = require("../config/mailer.config")

module.exports.login = (req, res, next) => {
  res.render("workers/login");
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("workers/login", { worker: req.body });
  }
  Worker.findOne({ email }).then(worker => {
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
        } else{
          req.session.worker = worker
          req.session.genericSuccess = "You are logged logged in. Welcome :)"
          res.redirect("/")

        }
      });
    }
  }).catch(error=>{
    if(error instanceof mongoose.Error.ValidationError){
      res.render("workers/login", {
        worker: req.body, 
        error: error.error

      })
    }else{
      next(error)
    }



  })
};

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/login")

}
 