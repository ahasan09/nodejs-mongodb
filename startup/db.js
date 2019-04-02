const mongoose = require("mongoose");

module.exports = function() {
  const mongoDb = "mongodb://localhost/customer_management";
  mongoose.connect(mongoDb, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;
  db.on("connected", () =>
    console.log("Mongodb database connected successfully...")
  );
  db.on("disconnected", () => console.log("connection disconnected"));
  //db.on("error", console.error.bind(console, "MongoDB connection error:"));
};
