const mongoose = require("mongoose");
const Wildlife = require("../models/Wildlife");
const Park = require("../models/Park");

const getAllWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Retrieve all wildlife, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
        in: 'query',
        description: 'Optional park ObjectId used to filter wildlife',
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

    const wildlife = await Wildlife.find(filter);
    return res.status(200).json(wildlife);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve wildlife"
    });
  }
};

const getWildlifeById = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Retrieve a single wildlife entry by its ID'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Wildlife ObjectId',
        required: true,
        type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid wildlife id"
      });
    }

    const wildlife = await Wildlife.findById(id);

    if (!wildlife) {
      return res.status(404).json({
        success: false,
        message: "Wildlife not found"
      });
    }

    return res.status(200).json(wildlife);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve wildlife"
    });
  }
};

const createWildlife = async (req, res) => {
  // #swagger.tags = ['Wildlife']
  // #swagger.description = 'Create a new wildlife entry. Authentication required.'
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Wildlife object',
      required: true,
      schema: {
          "parkId": "64b9f2b8a4b8a7c2d8291f11",
          "commonName": "Clarks Nutcracker",
          "scientificName": "Nucifraga columbiana",
          "category": "bird",
          "description": "A bird known for hoarding pine seeds.",
          "habitat": "High elevation pine forests",
          "conservationStatus": "Least Concern",
          "imageUrl": "https://example.com/bird.jpg"
      }
  } */
  try {
    const wildlife = await Wildlife.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Wildlife created successfully",
      wildlife
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
      message: error.message || "Failed to create wildlife"
    });
  }
};

const updateWildlife = async (req, res) => {
  // #swagger.tags = ['Wildlife']
  // #swagger.description = 'Update an existing wildlife entry by its ID. Authentication required.'
  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'Wildlife ObjectId',
      required: true,
      type: 'string'
  } */
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Wildlife fields to update',
      schema: {
          "commonName": "Clarks Nutcracker",
          "conservationStatus": "Near Threatened"
      }
  } */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid wildlife id"
      });
    }

    const wildlife = await Wildlife.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!wildlife) {
      return res.status(404).json({
        success: false,
        message: "Wildlife not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wildlife updated successfully",
      wildlife
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
      message: error.message || "Failed to update wildlife"
    });
  }
};

const deleteWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Delete a wildlife entry by its ID. Authentication required.'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Wildlife ObjectId',
        required: true,
        type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid wildlife id"
      });
    }

    const wildlife = await Wildlife.findByIdAndDelete(id);

    if (!wildlife) {
      return res.status(404).json({
        success: false,
        message: "Wildlife not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wildlife deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete wildlife"
    });
  }
};

module.exports = {
  getAllWildlife,
  getWildlifeById,
  createWildlife,
  updateWildlife,
  deleteWildlife
};
