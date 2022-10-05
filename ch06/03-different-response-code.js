const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get("/error", (rea, res) => {
//   res.status(500);
//   res.render("error");
// });

app.get("/error", (req, res) => res.status(500).render("error"));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`\nnavigate to http://localhost:${port}/about\n`)
);
