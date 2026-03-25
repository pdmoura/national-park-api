const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;
