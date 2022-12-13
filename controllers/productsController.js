const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");

exports.getAllProducts = async (req, res) => {
  try {
    const userData = req.userData;
    const products = await Product.find();
    res.status(StatusCodes.ACCEPTED).json({
      status: true,
      len: products.length,
      products,
      userData,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      description,
    });
    res.status(StatusCodes.CREATED).json({
      status: true,
      product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.CREATED).json({
      status: true,
      product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete(req.params.id);
    res.status(StatusCodes.CREATED).json({
      status: true,
      msg: "deleted",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.deleteAll = async (req, res) => {
  await Product.deleteMany({});
  res.send("Deleted");
};
