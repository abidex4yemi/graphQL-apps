const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const { connectDB } = require("./models");

connectDB();

const app = express();
app.use(bodyParser.json());

module.exports = app;
