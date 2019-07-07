const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

// Create Schema
const CustomerSchema = new Schema({
  urlId: {
    type: String,
    default: shortid.generate
  },
  email: {
    type: String,
    max: 50,
    required: true
  },
  name: {
    type: String,
    max: 50,
    required: true
  },
  address: {
    type: String,
    max: 250,
    required: true
  },
  currency: {
    type: String,
    max: 3,
    required: true,
    default: "EUR" //may be in the future can support many users from many countries
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
