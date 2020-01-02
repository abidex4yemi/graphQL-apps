require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressGraphQL = require("express-graphql");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);

const { MONGO_URI, connectDB } = require("./models");
connectDB();
const schema = require("./schema");

console.log(MONGO_URI);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.COOKIE_KEY,
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
