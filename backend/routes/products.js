const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// @route   GET /products/:name
// @desc    Get product by name
router.get("/products/:name", (req, res) => {
  // const errors = {};

  //get products
  Product.findOne({ name: req.params.name })
    .then(product => {
      console.log("product is: ", product);
      res.json(product);
    })
    .catch(err => {
      res.status(404);
      console.log(err, res.statusCode);
      res.json(err);
    }); //end get products
});

// @route   POST /product
// @desc    add new product
// router.post("/product", (req, res) => {
//   // const { errors, isValid } = validateOrderInput(req.body);

//   //Create
//   new Product(req.body)
//     .save()
//     .then(product => {
//       res.json(product);
//     })
//     .catch(err => {
//       res.status(404);
//       console.log(err, res.statusCode);
//       res.json(err);
//     });
// });

module.exports = router;
