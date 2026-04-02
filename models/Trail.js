const mongoose = require("mongoose");

const trailSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Park",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  elevationGain: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Moderate", "Strenuous"]
  },
  trailType: {
    type: String,
    required: true,
    enum: ["out-and-back", "loop", "point-to-point"]
  },
  dogFriendly: {
    type: Boolean,
    required: true
  },
  season: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Trail", trailSchema);
