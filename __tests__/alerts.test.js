const request = require("supertest");
const express = require("express");
const Alert = require("../models/Alert");

jest.mock("../models/Alert");

const app = express();
app.use(express.json());
app.use("/alerts", require("../routes/alerts"));

const fakeAlert = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  title: "North Entrance Closed",
  description: "Closed due to heavy snow.",
  category: "closure",
  startDate: "2023-11-01",
  endDate: "2024-05-01",
  isActive: true
};

describe("Alerts API", () => {
  test("GET /alerts returns 200 and an array", async () => {
    Alert.find.mockResolvedValue([fakeAlert]);
    const res = await request(app).get("/alerts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /alerts/:id returns 200 for valid id", async () => {
    Alert.findById.mockResolvedValue(fakeAlert);
    const res = await request(app).get("/alerts/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "North Entrance Closed");
  });

  test("GET /alerts/:id returns 404 for invalid id", async () => {
    Alert.findById.mockResolvedValue(null);
    const res = await request(app).get("/alerts/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });
});
