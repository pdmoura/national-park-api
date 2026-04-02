const express = require("express");
const router = express.Router();
const passport = require("../config/passport");


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


router.get("/logout", (req, res) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        return res.status(500).json({ error: "Failed to destroy session." });
      }
      res.redirect("/");
    });
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
