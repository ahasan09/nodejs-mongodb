// const path = require("path");
// const fs = require("fs");
// const os = require("os");

// //const emitter = new EventEmitter();

// const pathObj = path.parse(__filename);
// console.log(pathObj);

// const files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("./", function(error, files) {
//   if (error) console.log("Error", error);
//   else console.log("Result:", files);
// });

// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();

// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// //const EventEmitter = require("events");
// const Logger = require("./logger");
// const logger = new Logger();

// logger.on("messageLogged", arg => {
//   console.log("Event Received", arg);
// });

// logger.log("Hello");
// //emitter.emit("messageLogged", { id: 1, url: "www.google.com" });

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Raju Hasan");
    res.end();
  }

  if (req.url === "/api/customers") {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }
});

// server.on("connection", socket => {
//   console.log("New connection...");
// });

server.listen(3000);

console.log("Listening port 3000....");
