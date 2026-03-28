# CSE341 Final Project - National Park API
CSE341 — Web Services — Final Project

## Live URL
https://cse341-project-1-bo77.onrender.com

## API Documentation
https://cse341-project-1-bo77.onrender.com/api-docs

## Collections

### Parks
| Field | Type | Example |
|---|---|---|
| fullName | string | "Crater Lake National Park" |
| parkCode | string | "crla" |
| description | string | "Crater Lake inspires awe." |
| state | string | "Oregon" |
| region | string | "Pacific West" |
| latitude | string | "42.94065854" |
| longitude | string | "-122.1338414" |
| url | string | "https://www.nps.gov/crla/index.htm" |
| imageUrl | string | "https://example.com/crater.jpg" |
| established | string | "1902-05-22" |
| area | string | "183224 acres" |

**Endpoints:**
- `GET /parks` — Get all parks
- `GET /parks/:id` — Get a single park
- `POST /parks` — Create a park 🔒
- `PUT /parks/:id` — Update a park 🔒
- `DELETE /parks/:id` — Delete a park 🔒

### Adventures
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| userId | string | "github12345" |
| title | string | "Amazing Hike" |
| description | string | "Hiked down to the water." |
| date | string | "2023-08-15" |
| type | string (enum) | "hike" |
| duration | string | "3 hours" |
| difficulty | string (enum) | "Moderate" |
| rating | number (1-5) | 5 |

**Endpoints:**
- `GET /adventures`
- `GET /adventures/:id`
- `POST /adventures` 🔒
- `PUT /adventures/:id` 🔒
- `DELETE /adventures/:id` 🔒

### Alerts
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| title | string | "North Entrance Closed" |
| description | string | "Closed due to heavy snow." |
| category | string (enum)| "closure" |
| startDate | string | "2023-11-01" |
| endDate | string | "2024-05-01" |
| isActive | boolean | true |

**Endpoints:**
- `GET /alerts`
- `GET /alerts/:id`
- `POST /alerts` 🔒
- `PUT /alerts/:id` 🔒
- `DELETE /alerts/:id` 🔒

### Campgrounds
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| name | string | "Mazama Campground" |
| description | string | "Nestled in an old-growth forest." |
| reservationUrl| string | "https://example.com/reserve" |
| numSites | number | 214 |
| cost | string | "$21-$42" |
| amenities | string | "Flush toilets, showers" |
| season | string | "Summer" |
| latitude | string | "42.868" |
| longitude | string | "-122.167" |

**Endpoints:**
- `GET /campgrounds`
- `GET /campgrounds/:id`
- `POST /campgrounds` 🔒
- `PUT /campgrounds/:id` 🔒
- `DELETE /campgrounds/:id` 🔒

### Reviews
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| userId | string | "github12345" |
| rating | number (1-5) | 5 |
| title | string | "Breathtaking views" |
| comment | string | "Pictures do not do it justice." |
| visitDate | string | "2023-07-20" |
| createdAt | Date | "2023-07-25T14:32:00.000Z" |

**Endpoints:**
- `GET /reviews`
- `GET /reviews/:id`
- `POST /reviews` 🔒
- `PUT /reviews/:id` 🔒
- `DELETE /reviews/:id` 🔒

### Wildlife
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| commonName | string | "Clark's Nutcracker" |
| scientificName| string | "Nucifraga columbiana" |
| category | string (enum)| "bird" |
| description | string | "A bird known for hoarding pine seeds." |
| habitat | string | "High elevation pine forests" |
| conservationStatus| string | "Least Concern" |
| imageUrl | string | "https://example.com/bird.jpg" |

**Endpoints:**
- `GET /wildlife`
- `GET /wildlife/:id`
- `POST /wildlife` 🔒
- `PUT /wildlife/:id` 🔒
- `DELETE /wildlife/:id` 🔒

### Trails
| Field | Type | Example |
|---|---|---|
| parkId | ObjectId | "64b9f2b8a4b8a7c2d8291f11" |
| name | string | "Cleetwood Cove Trail" |
| description | string | "Only legal access to the shore of Crater Lake." |
| distance | string | "2.2 miles" |
| elevationGain | string | "700 ft" |
| difficulty | string (enum)| "Strenuous" |
| trailType | string (enum)| "out-and-back" |
| dogFriendly | boolean | false |
| season | string | "Summer" |

**Endpoints:**
- `GET /trails`
- `GET /trails/:id`
- `POST /trails` 🔒
- `PUT /trails/:id` 🔒
- `DELETE /trails/:id` 🔒

### Users
| Field | Type | Example |
|---|---|---|
| githubId | string | "12345678" |
| username | string | "johndoe" |
| displayName | string | "John Doe" |
| email | string | "john@example.com" |
| createdAt | Date | "2023-07-25T14:32:00.000Z" |

**Endpoints:**
- `GET /users`
- `GET /users/:id`
- `POST /users` 🔒
- `PUT /users/:id` 🔒
- `DELETE /users/:id` 🔒## Authentication

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
