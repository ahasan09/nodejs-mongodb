const winston = require("winston");
const express = require("express");
const app = express();

console.log("App Started");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
app.listen(port, () => console.log(`Listening on port ${port}...`));
