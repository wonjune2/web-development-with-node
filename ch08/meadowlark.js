const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const handlers = require("./lib/handlers");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/newsletter-signup", handlers.newsletterSignup);

app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);

app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Express on started http://localhost${port}!!`)
);
