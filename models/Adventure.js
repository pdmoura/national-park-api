const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema(
  {
    parkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Park",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["hike", "camp", "scenic drive", "wildlife viewing"],
    },
    duration: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Moderate", "Strenuous"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("Adventure", adventureSchema);
