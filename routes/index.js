const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  // #swagger.ignore = true
  const loggedIn = req.isAuthenticated();
  const name = loggedIn ? (req.user.displayName || req.user.username) : "";
    
  res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>National Park Adventures API</h1>
            ${loggedIn 
    ? `<p>Logged in as <b>${name}</b></p>
                   <a href="/api-docs">API Docs</a> | <a href="/auth/logout">Logout</a>`
    : `<p>Welcome to the National Parks API.</p>
                   <a href="/auth/login">Login with GitHub</a>`
}
        </div>
    `);
});

router.use("/auth", require("./auth"));
router.use("/parks", (req, res, next) => {
  // #swagger.tags = ['Parks']
  next();
}, require("./parks"));
router.use("/campgrounds", (req, res, next) => {
  // #swagger.tags = ['Campgrounds']
  next();
}, require("./campgrounds"));

router.use("/adventures", (req, res, next) => {
  // #swagger.tags = ['Adventures']
  next();
}, require("./adventures"));

router.use("/alerts", (req, res, next) => {
  // #swagger.tags = ['Alerts']
  next();
}, require("./alerts"));

router.use("/trails", (req, res, next) => {
  // #swagger.tags = ['Trails']
  next();
}, require("./trails"));

router.use("/wildlife", require("./wildlife"));
module.exports = router;
