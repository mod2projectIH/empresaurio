const session = require("express-session");
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")

const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 * 7;

module.exports = session({
  secret: "Secret", 
  resave: true, 
  saveUninitialized: false, 
  cookie: {
    secure: true
  }, 
  store: new MongoStore({
    mongooseConnection: mongoose.connection, 
    ttl: SESSION_MAX_AGE_SECONDS
  })
})

// Tenemos que mirar esto más a fondo