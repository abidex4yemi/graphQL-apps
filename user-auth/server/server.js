require("dotenv").config();
require("./models/user");
const express = require("express");
const cors = require("cors");
const expression = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(expression);
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

(async () => {
  let mongoUri = await mongoServer.getUri();

  const mongooseOpts = {
    // options for mongoose 4.11.3 and above
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };

  await mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      mongoose.connect(mongoUri, mongooseOpts);
    }
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });

  app.use(
    expression({
      resave: true,
      saveUninitialized: true,
      secret: process.env.COOKIE_KEY,
      store: new MongoStore({
        url: mongoUri,
        autoReconnect: true
      })
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
})();

const schema = require("./schema");

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
