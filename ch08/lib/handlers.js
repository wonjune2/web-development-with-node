exports.newsletterSignup = (req, res) => {
  // CSRF에 대해서는 나중에 알아봅니다. 지금은 일단 더미 값만 넣어 둡니다.
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log("Form (from querystring):", req.query.form);
  console.log("CSRF token (from hidden form field):", req.body._csrf);
  console.log("Name (from visible form field):", req.body.name);
  console.log("Email (from visible form field):", req.body.email);
  res.redirect(303, "/newsletter-signup/thank-you");
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
