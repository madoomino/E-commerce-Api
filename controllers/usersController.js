const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      msg: "Invalid Credentials",
    });
  }

  const hash = await User.createHash(password);
  try {
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      status: true,
      user,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      msg: "Invalid Credentials",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Credentials",
      });
    }
    const isValid = await user.passCompare(password);
    if (!isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Credentials",
      });
    }
    const token = user.createJWT();
    res.status(StatusCodes.ACCEPTED).json({
      status: true,
      user,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.ACCEPTED).json({
      status: true,
      len: users.length,
      users,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send("destroyed");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      msg: error.message,
    });
  }
};
