const Worker = require("../models/worker.model");
const Contract = require("../models/contract.model");
const Workday = require("../models/workday.model");
const ContractsList = require("../constants/contracts")
const RolesList = require("../constants/roles")
const StatesList = require("../constants/states")

const mongoose = require("mongoose");
// const mailer = require("../config/mailer.config")

module.exports.index = (req, res, next) => {

  const sorter = {startTime : -1}
  
  Worker.findOne({_id:req.currentWorker._id})
    .then(worker => { 
      if (worker.role === "Team leader"){
        Worker.find({workTeam:req.currentWorker.workTeam})
          .populate('workday')
        .then(workers => {
          console.log(workers)
          res.render("workers/index",{
            workers:workers,
            worker:worker
          })
        })
      }
      if(worker.isHR){
        Workday.find().sort(sorter).limit(10)
          .populate('worker')
        .then(workdays => {
          res.render("workers/index", {
            workdays:workdays,
            worker:worker
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
  console.log(worker)
  worker.save()
  
    .then((worker) => {
      console.log(worker)
      
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
          genericError: 'Worker already exists'
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
  Worker.findOne({ number })
    .populate('workday')
  .then(worker => {
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
          worker.workday && worker.isWorking && !worker.workday.break ? checkout(worker) : checkin(worker)
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
  date = new Date()
  if (!worker.workday || worker.workday.endTime || formDate(date) !== formDate(worker.workday.day)){
    worker.isWorking = true
    const workday = new Workday ({
      day: date,
      startTime: date,
      worker: worker
    })
    workday.save()
    worker.workday = workday
  } else {
    worker.workday.break = false
    worker.workday.dailyBreakTime.finish = date
  }
  worker.workday.save()   
  return worker
})

const checkout = (worker => { 
  if (!worker.workday){
    return worker.isWorking = false
  } 
  if (worker.workday.dailyBreakTime.finish){
    worker.isWorking = false
    worker.workday.endTime = new Date()
    worker.workday.workedHours += worker.workday.endTime - worker.workday.dailyBreakTime.finish
  }else{
    worker.workday.break = true
    worker.workday.dailyBreakTime.start = new Date()
    worker.workday.workedHours = worker.workday.dailyBreakTime.start - worker.workday.startTime
  }
  worker.workday.save()
  return worker  
})

const formDate = (date => {
  return `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}`
})


