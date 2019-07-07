const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

// Create Schema
const ProductSchema = new Schema({
  urlId: {
    type: String,
    default: shortid.generate //for easy access
  },
  name: {
    type: String,
    max: 100,
    required: true
  },
  specs: [
    {
      type: {
        type: String,
        max: 50,
        required: true
      },
      imgUrl: {
        type: String,
        max: 300,
        required: true
      },
      sizes: [
        {
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
          }
        }
      ]
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

module.exports = Product = mongoose.model("product", ProductSchema);
