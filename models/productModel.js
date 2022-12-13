const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Product name should be at least 5 chars"],
    required: [true, "Product name should be provided"],
  },
  price: {
    type: Number,
    required: [true, "Price should be provided"],
  },
  description: {
    type: String,
    required: [true, "Description should be provided"],
    minLength: [20, "Product description should be at least 20 chars"],
    maxLength: [280, "Try shorter description"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
