const express = require("express");
const espressHandlebars = require("express-handlebars");
const app = express();

app.engine(
  "handlebars",
  espressHandlebars({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
