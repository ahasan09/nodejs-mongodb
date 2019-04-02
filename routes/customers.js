const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

//asyncMiddleware()

router.get("/", auth, async (req, res, next) => {
  const customers = await Customer.find()
    .limit(10)
    .sort({ age: -1 });

  res.send(customers);
});

router.get("/:id", auth, async (req, res) => {
  console.log(req.params.id);
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let customer = new Customer(req.body);
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    for (var field in ex.errors) console.log(ex.errors[field].message);

    res.send(ex.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const customer = await Customer.findOneAndDelete({ _id: req.params.id });
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

module.exports = router;
