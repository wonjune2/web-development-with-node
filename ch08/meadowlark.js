const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const handlers = require("./lib/handlers");
const multiparty = require("multiparty");

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
app.use(bodyParser.json());

app.get("/newsletter-signup", handlers.newsletterSignup);

app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);

app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.get("/newsletter", handlers.newsletter);
app.get("/api/newsletter-signup", handlers.api.newsletterSignup);

app.get("/contest/vacation-photo", handlers.vacationPhotoContest);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

app.get(
  "/contest/vacation-photo-thank-you",
  handlers.vacationPhotoContestThankYou
);
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Express on started http://localhost${port}!!`)
);
