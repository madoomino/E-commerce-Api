const mongoose = require("mongoose");
const argon2 = require("argon2");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Product name should be at least 5 chars"],
    required: [true, "Name should be provided"],
  },
  email: {
    type: String,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter a valid email",
    ],
    required: [true, "Email should be provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password should be provided"],
    minlength: [8, "Password should be at least 8 chars"],
  },
});

userSchema.methods.passCompare = async function (plainText) {
  return await argon2.verify(this.password, plainText);
};

userSchema.statics.createHash = async function (plainText) {
  return await argon2.hash(plainText);
};

userSchema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
