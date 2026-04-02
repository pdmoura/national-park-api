const mongoose = require("mongoose");

const parkSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  parkCode: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, required: true },
  region: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  url: { type: String },
  imageUrl: { type: String },
  established: { type: String },
  area: { type: String }
});

module.exports = mongoose.model("Park", parkSchema);
