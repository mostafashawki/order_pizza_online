const express = require("express");
const router = express.Router();

// Load Input Validation
const validateOrderInput = require("../validation/order");

//Load needed models
const Order = require("../models/Order");

// for simplicity now, in real application we don't use user id directly,
//we use authorization in header using something like JWT
// @route   GET /orders/:id
// @desc    Get all orders for a customer
router.get("/orders/:id", (req, res) => {
  //get items
  Order.find({ customer: req.params.id })
    .populate("customer")
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      res.status(404);
      console.log(err, res.statusCode);
      res.json(err);
    });
});

// @route   POST /orders/create
// @desc    Create new order
router.post("/order", (req, res) => {
  console.log("^^^^^^", req.body);
  const { errors, isValid } = validateOrderInput(req.body);

  //Check Validation
  if (!isValid) {
    res.status(400);
    console.log(errors, errors.statusCode);
    return res.json(errors);
  }
  //=====================save new order

  //Create
  new Order(req.body)
    .save()
    .then(order => {
      res.json(order);
    })
    .catch(err => {
      res.status(404);
      console.log(err, res.statusCode);
      res.json(err);
    });
  //=====================end save order
});

// @route   PUT /orders
// @desc    update order
router.put("/order", (req, res) => {
  console.log("to update----", req.body);
  const { errors, isValid } = validateOrderInput(req.body);

  //Check Validation
  if (!isValid) {
    res.status(400);
    console.log(errors, errors.statusCode);
    return res.json(errors);
  }
  //=====================save updated order

  // Update (where status = "in-progress", because others like "delivered", "out for delivery"
  //or "canceled", not allowed to update
  Order.findOneAndUpdate(
    { urlId: req.body.urlId, status: "in-progress" },
    { $set: req.body },
    { new: true }
  )
    .then(order => {
      console.log("##########", order);
      res.json(order);
    })
    .catch(err => {
      res.status(404);
      console.log(err, res.statusCode);
      res.json(err);
    });

  //=====================end save edited order
});

// @route   /order
// @desc    Delete order
router.delete("/order", (req, res) => {
  Order.findOneAndRemove({ urlId: req.body.urlId }).then(() => {
    res.json("deleted");
  });
});

module.exports = router;
