const request = require("supertest");
const express = require("express");
const Adventure = require("../models/Adventure");

jest.mock("../models/Adventure");
jest.mock("../models/Park");

const app = express();
app.use(express.json());
app.use("/adventures", require("../routes/adventures"));

const fakeAdventure = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  userId: "github12345",
  title: "Amazing Hike",
  description: "Hiked down to the water.",
  date: "2023-08-15",
  type: "hike",
  duration: "3 hours",
  difficulty: "Moderate",
  rating: 5
};

describe("Adventures API", () => {
  test("GET /adventures returns 200 and an array", async () => {
    Adventure.find.mockResolvedValue([fakeAdventure]);
    const res = await request(app).get("/adventures");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /adventures/:id returns 200 for valid id", async () => {
    Adventure.findById.mockResolvedValue(fakeAdventure);
    const res = await request(app).get("/adventures/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Amazing Hike");
  });

  test("GET /adventures/:id returns 404 for invalid id", async () => {
    Adventure.findById.mockResolvedValue(null);
    const res = await request(app).get("/adventures/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });
});
