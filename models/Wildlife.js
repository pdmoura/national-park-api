const mongoose = require('mongoose');

const wildlifeSchema = new mongoose.Schema({
  parkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Park',
    required: true
  },
  commonName: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mammal', 'bird', 'fish', 'reptile', 'amphibian']
  },
  description: {
    type: String,
    required: true
  },
  habitat: {
    type: String,
    required: true
  },
  conservationStatus: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model('Wildlife', wildlifeSchema);
