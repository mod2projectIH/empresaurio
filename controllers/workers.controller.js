const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const ContractsList = require("../constants/contracts")
const RolesList = require("../constants/roles")
const StatesList = require("../constants/states")

const mongoose = require("mongoose");
// const mailer = require("../config/mailer.config")

module.exports.index = (req, res, next) => {

  const sorter = {number : 1}
  
  Worker.findOne({_id:req.currentWorker._id})
    .then(worker => {  
      if(worker.isHR){
        Worker.find().sort(sorter)
        .then(workers => {
          res.render("workers/index", {
            worker: worker,
            workers: workers
          })
        })

      }else{
        res.render("workers/index", {
          worker: worker
        })
      }
      


    }).catch(error => {
      console.log(error)
    })


}

// module.exports.hrIndex = (req, res, next) => {

//   Worker.find()

//     .then(worker => {

//       res.render("hr/hrIndex", {
//         currentWorker: req.currentWorker,
//         worker: worker
//       })

//     }).catch(error => {
//       console.log(error)
//     })




// }


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
      res.redirect('/')
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


module.exports.check = (req, res, next) => {
  res.render("workers/check");
};

module.exports.doCheck = (req, res, next) => {
  const { number, password } = req.body;
  const numberInt = Number(number)
  if (!number || !password || req.currentWorker.number !== numberInt) {
    return res.render("workers/check", { worker: req.body });
  }
  Worker.findOne({ number }).then(worker => {
    if (!worker) {
      res.render("workers/check", {
        worker: req.body,
        error: {
          password: "Password is not valid"
        }
      });
    } else {
      return worker.checkPassword(password).then(match => {
        if (!match) {
          res.render("workers/check", {
            worker: req.body,
            error: {
              password: "Password is not valid"
            }
          });
        } else{
          worker.isWorking ? checkout(worker) : checkin(worker)
          worker.save()         
          .then(() => {
            res.redirect("/")
          })
          .catch(next)
        }
      });
    }
  }).catch(error=>{
    if(error instanceof mongoose.Error.ValidationError){
      res.render("workers/check", {
        worker: req.body, 
        error: error.error

      })
    }else{
      next(error)
    }
  })
};
 

const checkin = (worker => {
  worker.isWorking = true
  const day = new Date()
  const workday = new Workday ({
    day: `${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}`,
    startTime: day,
    worker: worker
  })
  workday.save()
  worker.workday = workday
  return worker
})

const checkout = (worker => {
  worker.isWorking = false
  const day = new Date()
  Workday.findOne(worker.workday._id)
  .then(workday => {
    workday.endTime = day
    time = workday.endTime - workday.startTime
    hours = Math.floor((time / (1000 * 60 * 60))%24)
    min = Math.floor((time / (1000 * 60))%60)
    sec = Math.floor((time / 1000)%60)
    workday.workedHours = `${hours}h ${min}min ${sec}sec`
    workday.save()
  }).catch(error => error)
  return worker  
})


