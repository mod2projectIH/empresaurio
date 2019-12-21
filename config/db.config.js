const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://heroku_cqz0ddf7:vm4f8e69j281ptr5n7r53c7v32@ds257648.mlab.com:57648/heroku_cqz0ddf7";
let mongodbConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/empresaurio' : process.env.MONGODB_URI
mongoose
  .connect(mongodbConnection, { useNewUrlParser: true })
  .then(() => console.info(`Connected to the database at: ${MONGODB_URI}`))
  .catch(error =>
    console.error(
      `An error ocurred while connecting to the database at: ${MONGODB_URI}`,
      error
    )
  );

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Mongose disconectad on app termination");
    process.exit(0);
  });
});
