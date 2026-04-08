const request = require("supertest");
const express = require("express");
const Park = require("../models/Park");

jest.mock("../models/Park");

const app = express();
app.use(express.json());
app.use("/parks", require("../routes/parks"));

const fakePark = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  fullName: "Crater Lake National Park",
  parkCode: "crla",
  description: "Crater Lake inspires awe.",
  state: "Oregon",
  region: "Pacific West",
  latitude: "42.94065854",
  longitude: "-122.1338414"
};

describe("Parks API", () => {
  test("GET /parks returns 200 and an array", async () => {
    Park.find.mockResolvedValue([fakePark]);
    const res = await request(app).get("/parks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /parks/:id returns 200 and a park object for valid id", async () => {
    Park.findById.mockResolvedValue(fakePark);
    const res = await request(app).get("/parks/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("fullName", "Crater Lake National Park");
  });

  test("GET /parks/:id returns 404 for invalid id", async () => {
    Park.findById.mockResolvedValue(null);
    const res = await request(app).get("/parks/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });
});
