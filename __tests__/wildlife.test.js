const request = require("supertest");
const express = require("express");
const Wildlife = require("../models/Wildlife");

jest.mock("../models/Wildlife");
jest.mock("../models/Park");

const app = express();
app.use(express.json());
app.use("/wildlife", require("../routes/wildlife"));

const fakeWildlife = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  commonName: "Clarks Nutcracker",
  scientificName: "Nucifraga columbiana",
  category: "bird",
  description: "A bird known for hoarding pine seeds.",
  habitat: "High elevation pine forests",
  conservationStatus: "Least Concern",
  imageUrl: "https://example.com/bird.jpg"
};

describe("Wildlife API", () => {
  test("GET /wildlife returns 200 and an array", async () => {
    Wildlife.find.mockResolvedValue([fakeWildlife]);
    const res = await request(app).get("/wildlife");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /wildlife/:id returns 200 for valid id", async () => {
    Wildlife.findById.mockResolvedValue(fakeWildlife);
    const res = await request(app).get("/wildlife/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("commonName", "Clarks Nutcracker");
  });

  test("GET /wildlife/:id returns 404 for non-existent id", async () => {
    Wildlife.findById.mockResolvedValue(null);
    const res = await request(app).get("/wildlife/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });

  test("GET /wildlife/:id returns 400 for invalid id format", async () => {
    const res = await request(app).get("/wildlife/not-a-valid-id");
    expect(res.status).toBe(400);
  });
});
