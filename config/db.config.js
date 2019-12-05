const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/empresaurio";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
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
