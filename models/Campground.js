const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
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
  reservationUrl: {
    type: String
  },
  numSites: {
    type: Number,
    required: true,
    min: 1
  },
  cost: {
    type: String,
    required: true
  },
  amenities: {
    type: String
  },
  season: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Campground', campgroundSchema);
