const Adventure = require("../models/Adventure");

const getAllAdventures = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Retrieve all adventures, optionally filtered by parkId'
  try {
    const filter = {};
    if (req.query.parkId) filter.parkId = req.query.parkId;
    const adventures = await Adventure.find(filter);
    res.status(200).json(adventures);
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while fetching adventures." });
  }
};

const getAdventureById = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Retrieve a single adventure by its ID'
  try {
    const adventure = await Adventure.findById(req.params.id);
    if (!adventure) return res.status(404).json({ error: "Adventure not found." });
    res.status(200).json(adventure);
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while fetching the adventure." });
  }
};

const createAdventure = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Create a new adventure'
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Adventure object',
      required: true,
      schema: {
          "parkId": "64b9f2b8a4b8a7c2d8291f11",
          "userId": "github12345",
          "title": "Amazing Hike",
          "description": "Hiked down to the water.",
          "date": "2023-08-15",
          "type": "hike",
          "duration": "3 hours",
          "difficulty": "Moderate",
          "rating": 5
      }
  } */
  try {
    const adventure = await Adventure.create(req.body);
    res.status(201).json(adventure);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "An error occurred while creating the adventure." });
  }
};

const updateAdventure = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Update an adventure by its ID'
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Adventure object',
      schema: {
          "title": "Updated Hike",
          "rating": 4
      }
  } */
  try {
    const adventure = await Adventure.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!adventure) return res.status(404).json({ error: "Adventure not found." });
    res.status(200).json(adventure);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "An error occurred while updating the adventure." });
  }
};

const deleteAdventure = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Delete an adventure by its ID'
  try {
    const adventure = await Adventure.findByIdAndDelete(req.params.id);
    if (!adventure) return res.status(404).json({ error: "Adventure not found." });
    res.status(200).json({ message: "Adventure deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while deleting the adventure." });
  }
};

module.exports = {
  getAllAdventures,
  getAdventureById,
  createAdventure,
  updateAdventure,
  deleteAdventure
};
