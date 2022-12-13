const JWT = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new Error("Invalid token"));
  }
  const token = authHeader.split(" ")[1];
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  const { userId, name } = decoded;
  req.userData = { userId, name };
  next();
};
