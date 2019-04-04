const config = require("config");
const mongoose = require("mongoose");
const CONNECTION_URL=config.get("db");

module.exports = function() {
  //const mongoDb = config.get("db");
  
  if (!config.get("db")) {
    console.log("FATAL ERROR: db is not defined");
    process.exit(1);
  }

  const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useCreateIndex: true,
    useNewUrlParser: true
  }

  const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(CONNECTION_URL, options).then(()=>{
      console.log('MongoDB is connected')
    }).catch(err=>{
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
      setTimeout(connectWithRetry, 5000)
    })
  }

  //"mongodb://localhost/customer_management";
  // mongoose.connect(CONNECTION_URL, {
  //   useCreateIndex: true,
  //   useNewUrlParser: true
  // });
  // // Get Mongoose to use the global promise library
  // mongoose.Promise = global.Promise;
  // //Get the default connection
  // var db = mongoose.connection;
  // db.on("connected", () =>
  //   console.log("Mongodb database connected successfully...")
  // );
  db.on("disconnected", () => console.log("connection disconnected"));
  //db.on("error", console.error.bind(console, "MongoDB connection error:"));

  connectWithRetry();
};
