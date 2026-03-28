const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectDB } = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const User = require('./models/User');

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: 'GET, POST, PUT, DELETE, OPTIONS', origin: '*' }))
  .use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const user = await User.findOneAndUpdate(
        { githubId: profile.id },
        {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || ''
        },
        { upsert: true, new: true }
      );
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

connectDB().then(() => {
  app.listen(port, () => { console.log(`Node is running on port ${port}`) });
});
