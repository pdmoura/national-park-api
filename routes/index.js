const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome']
    const loggedIn = req.isAuthenticated();
    res.send(
      loggedIn
        ? `Logged in as ${req.user.displayName || req.user.username}. <a href="/auth/logout">Logout</a>`
        : 'Welcome to the National Parks API. <a href="/auth/login">Login with GitHub</a>'
    );
});

router.use('/auth', require('./auth'));
router.use('/parks', require('./parks'));

module.exports = router;
