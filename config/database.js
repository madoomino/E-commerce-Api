const { connect } = require("mongoose");

exports.connectDB = async (uri) => {
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("CONNECTED");
};
