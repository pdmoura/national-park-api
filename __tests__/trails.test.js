const request = require("supertest");
const express = require("express");
const Trail = require("../models/Trail");

jest.mock("../models/Trail");

const app = express();
app.use(express.json());
app.use("/trails", require("../routes/trails"));

const fakeTrail = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  name: "Cleetwood Cove Trail",
  description: "Only legal access to the shore of Crater Lake.",
  distance: "2.2 miles",
  elevationGain: "700 ft",
  difficulty: "Strenuous",
  trailType: "out-and-back",
  dogFriendly: false,
  season: "Summer"
};

describe("Trails API", () => {
  test("GET /trails returns 200 and an array", async () => {
    Trail.find.mockResolvedValue([fakeTrail]);
    const res = await request(app).get("/trails");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /trails/:id returns 200 for valid id", async () => {
    Trail.findById.mockResolvedValue(fakeTrail);
    const res = await request(app).get("/trails/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Cleetwood Cove Trail");
  });

  test("GET /trails/:id returns 404 for invalid id", async () => {
    Trail.findById.mockResolvedValue(null);
    const res = await request(app).get("/trails/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });
});
