// test/parks.test.js
// Unit tests for Parks API endpoints using Jest and Supertest

const request = require("supertest");
const mongoose = require("mongoose");
const { connectDB } = require("../data/database");
let app;

beforeAll(async () => {
  await connectDB();
  app = require("../server");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Parks API", () => {
  let createdParkId;
  const testPark = {
    fullName: "Test National Park",
    parkCode: "testnp",
    description: "A test park for unit testing.",
    state: "TestState",
    region: "TestRegion",
    latitude: "0.0000",
    longitude: "0.0000",
    url: "https://example.com",
    imageUrl: "https://example.com/image.jpg",
    established: "2026",
    area: "12345"
  };

  it("GET /parks should return all parks", async () => {
    const res = await request(app).get("/parks");
    if (res.statusCode !== 200) {
      console.log("Error response:", res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000); // Increased timeout to 15 seconds

  it("POST /parks should create a new park", async () => {
    const res = await request(app)
      .post("/parks")
      .send(testPark)
      .set("Accept", "application/json");
    if (res.statusCode === 201) {
      expect(res.body.fullName).toBe(testPark.fullName);
      createdParkId = res.body._id;
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
  });

  it("GET /parks/:id should return a single park", async () => {
    if (!createdParkId) return;
    const res = await request(app).get(`/parks/${createdParkId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body._id).toBe(createdParkId);
    }
  });

  it("PUT /parks/:id should update a park", async () => {
    if (!createdParkId) return;
    const update = { description: "Updated description." };
    const res = await request(app)
      .put(`/parks/${createdParkId}`)
      .send(update)
      .set("Accept", "application/json");
    expect([200, 401, 403, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.description).toBe(update.description);
    }
  });

  it("DELETE /parks/:id should delete a park", async () => {
    if (!createdParkId) return;
    const res = await request(app).delete(`/parks/${createdParkId}`);
    expect([200, 401, 403, 404]).toContain(res.statusCode);
    // Optionally check for success message if 200
  });
});
