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

// router
app.use((req, res, next) => {
  console.log(`processing request for ${req.url}...`);
  next();
});

app.use((req, res, next) => {
  console.log("terminating request");
  res.send("thanks for playing!");
});

app.use((req, res, next) => {
  console.log(`whoops, i'll never  get called!`);
});
//

app.use((req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express on started http://localhost:${port}!`)
);
