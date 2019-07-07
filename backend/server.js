const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const path        = require('path');

const app = express();
//set security headers
app.use(helmet());
const cors = require("cors");
//use cors
app.use(cors());

const customers = require("./routes/customers");
const orders = require("./routes/orders");
const products = require("./routes/products");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// *** config file *** //
const db = require("./config/dbConfig").mongoURI[app.settings.env];

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected: ", app.settings.env))
  .catch(err => console.log(err));

// create our router
const router = express.Router();

const port = process.env.PORT || 8080;

// REGISTER OUR ROUTES -------------------------------
app.use("/", router);
// Use Routes
app.use("/", customers);
app.use("/", orders);
app.use("/", products);

// error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  const errors = {};

  errors.message = error.message;
  res.json(errors);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server is running on port " + port);

module.exports = app;
