const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Park",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["closure", "warning", "info"]
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Alert", alertSchema);
