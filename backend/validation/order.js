const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrderInput(data) {
  console.log("from validator", data.currency);
  let errors = {};

  data.currency = !isEmpty(data.currency) ? data.currency : "";

  // checks if value contains any invalid character
  if (/[^A-Z]/.test(data.currency)) {
    errors.text =
      "No special characters or numbers allowed (capital letters only) !";
  }

  if (!validator.isLength(data.currency, { min: 3, max: 3 })) {
    errors.text = "currency must be 3 characters only";
  }

  if (validator.isEmpty(data.currency)) {
    errors.text = "Currency field is required";
  }

  //start validate items
  // let items = JSON.parse(data.items);
  let items = data.items;

  for (let i = 0; i < items.length; i++) {
    items[i].price = !isEmpty(items[i].price) ? items[i].price : "";
    items[i].qty = !isEmpty(items[i].qty) ? items[i].qty : "";
    items[i].name = !isEmpty(items[i].name) ? items[i].name : "";
    items[i].type = !isEmpty(items[i].type) ? items[i].type : "";
    items[i].size = !isEmpty(items[i].size) ? items[i].size : "";
    if (items[i].price < 1 || items[i].price > 999999999999999) {
      errors.text = "price range between 1 and 999999999999999";
    }

    if (validator.isEmpty(items[i].price.toString())) {
      errors.text = "Price field is required";
    }

    if (!validator.isDecimal(items[i].price.toString())) {
      errors.text = "not a valid number";
    }

    if (items[i].qty < 1 || items[i].qty > 99) {
      errors.text = "Quantity range between 1 and 99";
    }

    if (validator.isEmpty(items[i].qty.toString())) {
      errors.text = "Quantity field is required";
    }

    if (!validator.isDecimal(items[i].qty.toString())) {
      errors.text = "Quantity not a valid number";
    }

    //name

    if (!validator.isLength(items[i].name, { min: 1, max: 300 })) {
      errors.text = "name must be within 1 - 300 characters only";
    }

    if (validator.isEmpty(items[i].name)) {
      errors.text = "name field is required";
    }

    //type

    if (!validator.isLength(items[i].type, { min: 1, max: 50 })) {
      errors.text = "type must be within 1 - 50 characters only";
    }

    if (validator.isEmpty(items[i].type)) {
      errors.text = "type field is required";
    }
    //size

    if (!validator.isLength(items[i].size, { min: 1, max: 1 })) {
      errors.text = "one character only is allowed";
    }

    if (validator.isEmpty(items[i].size)) {
      errors.text = "size field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
