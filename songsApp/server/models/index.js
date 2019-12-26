const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("./lyric");
require("./song");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

const connectDB = () => {
  mongoServer.getConnectionString().then(mongoUri => {
    const mongooseOpts = {
      // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on("error", e => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });

    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected`);
    });
  });
};

module.exports = { connectDB };
