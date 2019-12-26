const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");

const { connectDB } = require("./models");

const schema = require("./schema");

connectDB();

const app = express();
app.use(bodyParser.json());

app.use(
  expressGraphQL({
    graphiql: true,
    schema
  })
);

module.exports = app;
