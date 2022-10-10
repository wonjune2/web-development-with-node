const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const cookieParser = require("cookie-parser");
const credentials = require("./.credentials.development");
const bodyParser = require("body-parser");
const handlers = require("./lib/handlers");
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

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express on started http://localhost:${port}!`)
);
