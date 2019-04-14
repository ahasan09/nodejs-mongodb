const config = require("config");

module.exports = function() {
  const jwtPrivateKey = config.get("jwtPrivateKey");
  if (!jwtPrivateKey) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
  } else console.log("jwtPrivateKey: ", jwtPrivateKey);
};
