const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("./user");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

const connectDB = () => {
  mongoServer.getConnectionString().then(mongoUri => {
    // options for mongoose above 4.11.3 and above

    mongooseOPTS = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };

    mongoose.connect(mongoUri, mongooseOPTS);

    mongoose.connection.on("error", err => {
      if (err.message.code == "ETIMEDOUT") {
        console.log(err);
        mongoose.connect(mongoUri, mongooseOPTS);
      }
      console.log(e);
    });

    mongoose.connection.once("open", () => {
      console.log("MongoDB successfully connected");
    });
  });
};

module.exports = {
  connectDB
};
