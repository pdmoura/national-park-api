const request = require("supertest");
const express = require("express");
const Campground = require("../models/Campground");

jest.mock("../models/Campground");
jest.mock("../models/Park");

const app = express();
app.use(express.json());
app.use("/campgrounds", require("../routes/campgrounds"));

const fakeCampground = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  name: "Mazama Campground",
  description: "Nestled in an old-growth forest.",
  reservationUrl: "https://example.com/reserve",
  numSites: 214,
  cost: "$21-$42",
  amenities: "Flush toilets, showers",
  season: "Summer",
  latitude: "42.868",
  longitude: "-122.167"
};

describe("Campgrounds API", () => {
  test("GET /campgrounds returns 200 and an array", async () => {
    Campground.find.mockResolvedValue([fakeCampground]);
    const res = await request(app).get("/campgrounds");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /campgrounds/:id returns 200 for valid id", async () => {
    Campground.findById.mockResolvedValue(fakeCampground);
    const res = await request(app).get("/campgrounds/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Mazama Campground");
  });

  test("GET /campgrounds/:id returns 404 for invalid id", async () => {
    Campground.findById.mockResolvedValue(null);
    const res = await request(app).get("/campgrounds/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });
});
