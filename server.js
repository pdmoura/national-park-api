require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const { connectDB } = require('./data/database');
const passport = require('./config/passport');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: isProduction,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to initialize database. Server not started.', err);
    process.exit(1);
  }
}

startServer().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
