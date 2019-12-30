const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require("cors");

const { connectDB } = require("./models");

const schema = require("./schema");

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema
  })
);

module.exports = app;
