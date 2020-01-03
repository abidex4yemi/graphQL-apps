require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressGraphQL = require("express-graphql");

const { connectDB } = require("./models");

const app = express();
connectDB(app);
const schema = require("./schema");

app.use(cors());
app.use(bodyParser.json());

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
