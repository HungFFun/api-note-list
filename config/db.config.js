const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = `${process.env.mongoUrl}`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// connect mongo
const connectWithRetry = () => {
  return mongoose.connect(mongoUrl, connectionParams, (err) => {
    if (err) {
      console.error(
        "Failed to connect to mongo on startup - retrying in 5 sec",
        err
      );
      setTimeout(connectWithRetry, 5000);
    }
    console.log("connect to mongo on startup");
  });
};

module.exports = {
  connectWithRetry: connectWithRetry,
};
