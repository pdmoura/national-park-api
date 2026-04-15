const mongoose = require("mongoose");
const Campground = require("../models/Campground");
const Park = require("../models/Park");

const getAllCampgrounds = async (req, res) => {
  /* #swagger.tags = ['Campgrounds']
       #swagger.description = 'Retrieve all campgrounds, optionally filtered by parkId or season'
       
       #swagger.parameters['parkId'] = {
          in: 'query',
          description: 'Optional park ObjectId used to filter campgrounds',
          required: false,
          type: 'string'
       }

       #swagger.parameters['season'] = {
          in: 'query',
          description: 'Filter campgrounds by season (e.g., Summer)',
          required: false,
          type: 'string'
       }
    */
  try {
    const filter = {};

    // 🔹 Existing parkId logic (UNCHANGED)
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

    // 🔥 NEW FILTER (SAFE ADDITION)
    if (req.query.season) {
      filter.season = req.query.season;
    }

    const campgrounds = await Campground.find(filter);
    return res.status(200).json(campgrounds);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve campgrounds"
    });
  }
};

const getCampgroundById = async (req, res) => {
  /* #swagger.tags = ['Campgrounds']
       #swagger.description = 'Retrieve a single campground by its ID'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Campground ObjectId',
          required: true,
          type: 'string'
       }
    */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campground id"
      });
    }

    const campground = await Campground.findById(id);

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: "Campground not found"
      });
    }

    return res.status(200).json(campground);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve campground"
    });
  }
};

const createCampground = async (req, res) => {
  /* #swagger.tags = ['Campgrounds']
       #swagger.description = 'Create a new campground. Authentication required.'
       #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Campground object',
          required: true,
          schema: {
             "parkId": "64f1234567890abcde654321",
             "name": "Rim Village Campground",
             "description": "Popular lakeside campground with reservable sites.",
             "reservationUrl": "https://example.com/reservations/rim-village",
             "numSites": 45,
             "cost": "$25 per night",
             "amenities": "Restrooms, potable water, fire pits",
             "season": "May through September",
             "latitude": "42.9446",
             "longitude": "-122.1090"
          }
       }
    */
  try {
    const campground = await Campground.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Campground created successfully",
      campground
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
      message: "Failed to create campground"
    });
  }
};

const updateCampground = async (req, res) => {
  /* #swagger.tags = ['Campgrounds']
       #swagger.description = 'Update an existing campground by its ID. Authentication required.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Campground ObjectId',
          required: true,
          type: 'string',
          example: '64f1234567890abcde123456'
       }
       #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Campground fields to update',
          schema: {
             "name": "Rim Village Campground",
             "numSites": 50,
             "cost": "$30 per night",
             "season": "June through September"
          }
       }
    */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campground id"
      });
    }

    const campground = await Campground.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: "Campground not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campground updated successfully",
      campground
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
      message: "Failed to update campground"
    });
  }
};

const deleteCampground = async (req, res) => {
  /* #swagger.tags = ['Campgrounds']
       #swagger.description = 'Delete a campground by its ID. Authentication required.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Campground ObjectId',
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
        message: "Invalid campground id"
      });
    }

    const campground = await Campground.findByIdAndDelete(id);

    if (!campground) {
      return res.status(404).json({
        success: false,
        message: "Campground not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campground deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete campground"
    });
  }
};

module.exports = {
  getAllCampgrounds,
  getCampgroundById,
  createCampground,
  updateCampground,
  deleteCampground
};
