//exports,require,module,__filename,__dirname
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    this.emit("messageLogged", { id: 1, url: "www.google.com" });
  }
}

console.log(__filename);
console.log(__dirname);

var url = "www.google.com";

// function log(message) {
//   console.log(message);
// }

module.exports = Logger; //Function
// //module.exports.log = log; //Object
