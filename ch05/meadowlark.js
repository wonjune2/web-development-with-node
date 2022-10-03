const fortune = require("./lib/fortune");
const handlerbars = require("./lib/handlers");
const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", handlerbars.home);

app.get("/about", handlerbars.about);

app.use(handlerbars.notFount);

app.use(handlerbars.serverError);

app.listen(port, () => console.log(`Express started on port:${port}`));
