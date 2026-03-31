const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/login", (req, res, next) => {
  // #swagger.ignore = true
  next();
}, passport.authenticate("github", { scope: ["user:email"] }));


router.get("/callback",
  (req, res, next) => {
    // #swagger.ignore = true
    next();
  },
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);


router.get("/logout", (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.redirect("/");
  });
});


router.get("/status", (req, res) => {
  // #swagger.ignore = true
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(401).json({ error: "Not logged in." });
});

module.exports = router;
