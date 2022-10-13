class NewsletterSignup {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }
  async save() {}
}
const VALID_EMAIL_REGEX = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
    "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
    "(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
);
exports.newsletterSignup = (req, res) => {
  // CSRF에 대해서는 나중에 알아봅니다. 지금은 일단 더미 값만 넣어 둡니다.
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });
};

// exports.newsletterSignupProcess = (req, res) => {
//   console.log("Form (from querystring):", req.query.form);
//   console.log("CSRF token (from hidden form field):", req.body._csrf);
//   console.log("Name (from visible form field):", req.body.name);
//   console.log("Email (from visible form field):", req.body.email);
//   res.redirect(303, "/newsletter-signup/thank-you");
// };

exports.NewsletterSignupProcess = (req, res) => {
  const name = req.body.name || "",
    email = req.body.email || "";
  if (!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: "danger",
      intro: "Validation error!",
      message: "The email address you entered was not valid",
    };
    return res.redirect(303, "/newsletter-signup");
  }
  new NewsletterSignup({ name, email })
    .save()
    .then(() => {
      req.session.flash = {
        type: "success",
        intro: "Thank you!",
        message: "You have now been signed up for the newsletter",
      };
      return res.redirect(303, "/newsletter-archive");
    })
    .catch((err) => {
      req.session.flash = {
        type: "danger",
        intro: "Database Error!",
        message: "There was a database error; please try agin letter",
      };
      return res.redirect(303, ".newsletter-archive");
    });
};

exports.newsletterSignupThankYou = (req, res) => {
  res.render("newsletter-signup-thank-you");
};

exports.newsletter = (req, res) => {
  // CSRF에 대해서는 나중에 알아봅니다. 지금은 일단 더미 값만 넣어둡니다.
  res.render("newsletter", { csrf: "CSRF token goes here" });
};

exports.api = {
  newsletterSignup: (req, res) => {
    console.log("CSRF token (from gidden form field):", req.body._csrf);
    console.log("Name (from visible form field):", req.body.name);
    console.log("Email (from visible form field):", req.body.email);
    res.send({ resutl: "success" });
  },
};

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log("field data: ", fields);
  console.log("files:", files);
  res.redirect(303, "/contest/vacation-photo-thank-you");
};

exports.vacationPhotoContest = (req, res) => {
  const now = new Date();
  res.render("contest/vacation-photo", {
    year: now.getFullYear(),
    month: now.getFullYear(),
  });
};

exports.vacationPhotoContestThankYou = (req, res) => {
  res.render("contest/vacation-photo-thank-you");
};

exports.vacationPhotoContestAjax = (req, res) => {
  console.log("Ajax!!");
  const now = new Date();
  res.render("contest/vacation-photo-ajax", {
    year: now.getFullYear(),
    month: now.getMonth(),
  });
};

exports.api.vacationPhotoContest = (req, res, fields, files) => {
  console.log("field data:", fields);
  console.log("files:", files);
  console.log("success!!");
  res.send({ result: "success" });
};
