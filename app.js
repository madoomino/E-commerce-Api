const express = require("express");
const app = express();
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const { auth } = require("./middleware/authMiddleware");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", auth, productsRouter);
app.use("/users", usersRouter);
module.exports = app;
