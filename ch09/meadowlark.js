const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const cookieParser = require("cookie-parser");
const credentials = require("./.credentials.development");
const bodyParser = require("body-parser");
const handlers = require("./lib/handlers");
const expressSession = require("express-session");
const flashMiddleware = require("./lib/middleware/flash");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);

app.use(flashMiddleware);

app.use(cookieParser(credentials.cookieSecret));

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

app.get("/", handlers.home);

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);
app.get("/newsletter-archive", handlers.newsletterSignupThankYou);

app.use((req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express on started http://localhost:${port}!`)
);
