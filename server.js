const app = require("./app");
const port = process.env.PORT || 5000;
const connectDB = require("./config/database").connectDB;
require("dotenv").config();

// DB Connection
async function connect(uri) {
  await connectDB(uri);
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}
connect(process.env.OFF_DB);
