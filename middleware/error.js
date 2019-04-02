const winston=require("winston");

module.exports = function(error, req, res, next) {
    //Log the error
    winston.error(error.message,error);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly

  res.status(500).send("Something happened wrong.");
};
