const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(250)
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .min(5)
      .max(255)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .trim()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
