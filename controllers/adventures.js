const mongoose = require("mongoose");
const Adventure = require("../models/Adventure");
const Park = require("../models/Park");

const getAllAdventures = async (req, res) => {
  /* #swagger.tags = ['Adventures']
     #swagger.description = 'Retrieve all adventures, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
        in: 'query',
        description: 'Optional park ObjectId used to filter adventures',
        required: false,
        type: 'string'
     }
  */
  try {
    const filter = {};

    if (req.query.parkId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.parkId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid parkId"
        });
      }

      filter.parkId = req.query.parkId;

      const park = await Park.findById(req.query.parkId);
      if (!park) {
        return res.status(404).json({
          success: false,
          message: "Park not found"
        });
      }
    }

    const adventures = await Adventure.find(filter);
    return res.status(200).json(adventures);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve adventures"
    });
  }
};

const getAdventureById = async (req, res) => {
  /* #swagger.tags = ['Adventures']
     #swagger.description = 'Retrieve a single adventure by its ID'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Adventure ObjectId',
        required: true,
        type: 'string',
        example: '64f1234567890abcde123456'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid adventure id"
      });
    }

    const adventure = await Adventure.findById(id);

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: "Adventure not found"
      });
    }

    return res.status(200).json(adventure);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve adventure"
    });
  }
};

const createAdventure = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Create a new adventure. Authentication required.'
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

    return res.status(201).json({
      success: true,
      message: "Adventure created successfully",
      adventure
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided"
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create adventure"
    });
  }
};

const updateAdventure = async (req, res) => {
  // #swagger.tags = ['Adventures']
  // #swagger.description = 'Update an existing adventure by its ID. Authentication required.'
  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'Adventure ObjectId',
      required: true,
      type: 'string',
      example: '64f1234567890abcde123456'
  } */
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Adventure fields to update',
      schema: {
          "title": "Updated Hike",
          "rating": 4
      }
  } */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid adventure id"
      });
    }

    const adventure = await Adventure.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: "Adventure not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Adventure updated successfully",
      adventure
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided"
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update adventure"
    });
  }
};

const deleteAdventure = async (req, res) => {
  /* #swagger.tags = ['Adventures']
     #swagger.description = 'Delete an adventure by its ID. Authentication required.'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Adventure ObjectId',
        required: true,
        type: 'string',
        example: '64f1234567890abcde123456'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid adventure id"
      });
    }

    const adventure = await Adventure.findByIdAndDelete(id);

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: "Adventure not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Adventure deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete adventure"
    });
  }
};

module.exports = {
  getAllAdventures,
  getAdventureById,
  createAdventure,
  updateAdventure,
  deleteAdventure
};
