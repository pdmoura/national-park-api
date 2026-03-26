# cse341-project2
CSE341 — Web Services — Project #2

## Live URL
https://cse341-project-1-bo77.onrender.com

## API Documentation
https://cse341-project-1-bo77.onrender.com/api-docs

## Collections

### Parks
| Field | Type | Example |
|---|---|---|
| description | string | "Crater Lake inspires awe." |
| fullName | string | "Crater Lake National Park" |
| latLong | string | "lat:42.94065854, long:-122.1338414" |
| latitude | string | "42.94065854" |
| longitude | string | "-122.1338414" |
| parkCode | string | "crla" |
| url | string | "https://www.nps.gov/crla/index.htm" |

**Endpoints:**
- `GET /parks` — Get all parks
- `GET /parks/:id` — Get a single park
- `POST /parks` — Create a park 🔒
- `PUT /parks/:id` — Update a park 🔒
- `DELETE /parks/:id` — Delete a park 🔒



## Authentication

This API uses **GitHub OAuth** via Passport.js for authentication. Routes marked with 🔒 require login.

- `GET /auth/login` — Redirects to GitHub for OAuth login
- `GET /auth/callback` — GitHub OAuth callback
- `GET /auth/logout` — Logs out and destroys the session

## Setup
```bash
npm install
npm start
```

Requires a `.env` file with:
```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3000
SESSION_SECRET=<your-session-secret>
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_CALLBACK_URL=<your-callback-url>
```
