const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

// Create Schema
const OrderSchema = new Schema({
  urlId: {
    type: String,
    default: shortid.generate //for easy access
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer"
  },
  status: {
    type: String,
    max: 50,
    required: true
  },
  items: [
    {
      name: {
        type: String,
        max: 300,
        required: true
      },
      type: {
        type: String,
        max: 50,
        required: true
      },
      size: {
        type: String,
        max: 1,
        required: true
      },
      price: {
        type: Number,
        min: 1,
        max: 999999999999999,
        required: true
      },
      qty: {
        type: Number,
        min: 1,
        max: 99,
        required: true
      }
    }
  ],
  currency: {
    type: String,
    max: 3,
    required: true,
    default: "EUR" //may be in the future can support many countries
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
