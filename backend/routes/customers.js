const express = require("express");
const router = express.Router();

// Load Input Validation
const validateCustomerInput = require("../validation/customer");

//Load Customer model
const Customer = require("../models/Customer");

// @route   POST /customer
// @desc    Create customer
router.post("/customer", (req, res) => {
  const { errors, isValid } = validateCustomerInput(req.body);

  //Check Validation
  if (!isValid) {
    res.status(400);
    console.log(errors, errors.statusCode);
    res.json(errors);
  }
  //=====================save

  Customer.findOne({ email: req.body.email }).then(customer => {
    if (customer) {
      errors.exist = "Email Already Exist!";
      res.status(400);
      console.log(errors, errors.statusCode);
      res.json(errors);
    } else {
      // Create
      new Customer(req.body)
        .save()
        .then(customer => {
          res.json(customer);
        })
        .catch(err => {
          errors.err = err;
          res.status(404);
          console.log(errors, res.statusCode);
          res.json(errors);
        });
    }
  });
});

module.exports = router;
