# CSE341 Final Project - National Park API
CSE341 — Web Services — Final Project

## Live URL
https://national-park-api-sr58.onrender.com

## API Documentation
https://national-park-api-sr58.onrender.com/api-docs

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

## Setup Instructions for MongoDB and GitHub OAuth

### 1. Configure `.env`
Each developer should create their own `.env` file (based on `.env.sample`) and add their **MongoDB connection string** from their cluster.

- Copy `.env.sample` → `.env`
- Fill in the values:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

SESSION_SECRET=<your-generated-secret>
GITHUB_CLIENT_ID=<your-dev-github-app-client-id>
GITHUB_CLIENT_SECRET=<your-dev-github-app-client-secret>
GITHUB_CALLBACK_URL=http://localhost:3000/auth/callback
PORT=3000
NODE_ENV=development
```

⚠️ **Important:**
- Replace `<cluster-url>` with your MongoDB Atlas cluster URL.
- Add a `<database-name>` at the end of the URI (e.g., `nationalparks`) so collections are created inside that database.
- Use [this link](https://generate-secret.vercel.app/64) to generate a secure `SESSION_SECRET`.
- **Alternative (via Terminal):**
  1. Open a terminal and type `node` then press **Enter**.
  2. Type `require('crypto').randomBytes(64).toString('hex')` and press **Enter**.
  3. Copy the generated string (without the single quotes) and paste it into your `.env`.

### 2. Create a GitHub OAuth App
This project uses GitHub OAuth for authentication. Each developer must create their own GitHub OAuth App for local testing.

1. Go to **GitHub Developer Settings**.
2. Under **OAuth Apps**, click **New OAuth App**.
3. Fill in the form:
   - **Application name**: National Park API (Dev) (or any name you like)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/auth/callback`
4. Click **Register application**.
5. Copy the **Client ID** and generate a **Client Secret**.
6. Add these values to your `.env` file:

```bash
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_CLIENT_SECRET=<your-client-secret>
GITHUB_CALLBACK_URL=http://localhost:3000/auth/callback
```

### 3. Seed the Database
Once `.env` is configured, run:

```bash
node seed.js
```

This will:
- Connect to your MongoDB cluster.
- Clear existing collections.
- Insert fake data into parks, users, adventures, campgrounds, reviews, trails, and wildlife.

## Development Workflow

To contribute to this project:
1. Ensure you are on the `development` branch and perform a `git pull` to get the latest changes.
2. Create a new branch for your task. Prefix it with your initials and follow the issue recommendation name.
   - Example: `feature/swagger-setup` becomes `pa-feature/swagger-setup` (if your initials are `pa`).
3. Before committing, run the linter to catch any errors:
   ```bash
   npm run lint
   ```
4. If any errors are reported, run the auto-fix command:
   ```bash
   npm run lint:fix
   ```
   Then re-run `npm run lint` to confirm all issues are resolved.
5. Commit your changes and push them to the repository.
6. Open a **Pull Request** from your branch to the `development` branch for evaluation and merging.

## Testing

This project uses [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladakh/supertest) for unit testing the API endpoints. Tests mock the Mongoose models so no database connection is required.

### Getting Started

Jest and Supertest are included in `devDependencies`, so no extra installation is needed. After pulling the repo:

1. Run `npm install` to install all dependencies (including test tools)
2. Run `npm test` to execute all tests

### Running Tests

```bash
npm test
```

To run a specific test file:

```bash
npx jest __tests__/parks.test.js
```

### Test Coverage

#### Parks
| Test | Method | Endpoint | Expected |
|---|---|---|---|
| Returns all parks | GET | `/parks` | 200, array |
| Returns a single park | GET | `/parks/:id` | 200, park object |
| Park not found | GET | `/parks/:id` | 404 |

#### Adventures
| Test | Method | Endpoint | Expected |
|---|---|---|---|
| Returns all adventures | GET | `/adventures` | 200, array |
| Returns a single adventure | GET | `/adventures/:id` | 200, adventure object |
| Adventure not found | GET | `/adventures/:id` | 404 |

#### Alerts
| Test | Method | Endpoint | Expected |
|---|---|---|---|
| Returns all alerts | GET | `/alerts` | 200, array |
| Returns a single alert | GET | `/alerts/:id` | 200, alert object |
| Alert not found | GET | `/alerts/:id` | 404 |

#### Campgrounds
| Test | Method | Endpoint | Expected |
|---|---|---|---|
| Returns all campgrounds | GET | `/campgrounds` | 200, array |
| Returns a single campground | GET | `/campgrounds/:id` | 200, campground object |
| Campground not found | GET | `/campgrounds/:id` | 404 |

#### Trails
| Test | Method | Endpoint | Expected |
|---|---|---|---|
| Returns all trails | GET | `/trails` | 200, array |
| Returns a single trail | GET | `/trails/:id` | 200, trail object |
| Trail not found | GET | `/trails/:id` | 404 |
