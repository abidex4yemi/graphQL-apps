const mongoose = require("mongoose");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const { MongoMemoryServer } = require("mongodb-memory-server");
require("./user");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

const connectDB = app => {
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

      app.use(
        expressSession({
          resave: true,
          saveUninitialized: true,
          secret: process.env.COOKIE_KEY,
          store: new MongoStore({
            url: mongoUri,
            autoReconnect: true
          })
        })
      );
    });
  });
};

module.exports = {
  connectDB
};
