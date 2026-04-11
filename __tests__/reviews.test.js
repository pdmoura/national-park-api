const request = require("supertest");
const express = require("express");
const Review = require("../models/Review");

jest.mock("../models/Review");
jest.mock("../models/Park");

const app = express();
app.use(express.json());
app.use("/reviews", require("../routes/reviews"));

const fakeReview = {
  _id: "64b9f2b8a4b8a7c2d8291f11",
  parkId: "64b9f2b8a4b8a7c2d8291f00",
  userId: "github12345",
  rating: 5,
  title: "Breathtaking views",
  comment: "Absolutely beautiful park!",
  visitDate: "2023-07-20"
};

describe("Reviews API", () => {
  test("GET /reviews returns 200 and an array", async () => {
    Review.find.mockResolvedValue([fakeReview]);
    const res = await request(app).get("/reviews");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /reviews/:id returns 200 for valid id", async () => {
    Review.findById.mockResolvedValue(fakeReview);
    const res = await request(app).get("/reviews/64b9f2b8a4b8a7c2d8291f11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title", "Breathtaking views");
  });

  test("GET /reviews/:id returns 404 for non-existent id", async () => {
    Review.findById.mockResolvedValue(null);
    const res = await request(app).get("/reviews/64b9f2b8a4b8a7c2d8291f00");
    expect(res.status).toBe(404);
  });

  test("GET /reviews/:id returns 400 for invalid id format", async () => {
    const res = await request(app).get("/reviews/not-a-valid-id");
    expect(res.status).toBe(400);
  });
});
