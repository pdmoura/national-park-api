const mongoose = require("mongoose");
const Trail = require("../models/Trail");

const getAllTrails = async (req, res) => {
  /* #swagger.tags = ['Trails']
     #swagger.description = 'Retrieve all trails with pagination, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
       in: 'query',
       description: 'Optional park ObjectId used to filter trails',
       required: false,
       type: 'string'
     }
     #swagger.parameters['page'] = {
       in: 'query',
       description: 'Page number (default: 1)',
       required: false,
       type: 'integer'
     }
     #swagger.parameters['limit'] = {
       in: 'query',
       description: 'Number of results per page (default: 10)',
       required: false,
       type: 'integer'
     }
  */
  try {
    const filter = {};

    if (req.query.parkId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.parkId)) {
        return res.status(400).json({ error: "Invalid parkId." });
      }
      filter.parkId = req.query.parkId;
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [trails, total] = await Promise.all([
      Trail.find(filter).skip(skip).limit(limit),
      Trail.countDocuments(filter)
    ]);

    return res.status(200).json({
      data: trails,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching trails."
    });
  }
};

const getTrailById = async (req, res) => {
  /* #swagger.tags = ['Trails']
     #swagger.description = 'Retrieve a single trail by its ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trail ObjectId',
       required: true,
       type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trail id." });
    }

    const trail = await Trail.findById(id);

    if (!trail) {
      return res.status(404).json({ error: "Trail not found." });
    }

    return res.status(200).json(trail);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching the trail."
    });
  }
};

const createTrail = async (req, res) => {
  /* #swagger.tags = ['Trails']
     #swagger.description = 'Create a new trail. Authentication required.'
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Trail object',
       required: true,
       schema: {
         "parkId": "64f1234567890abcde654321",
         "name": "Cleetwood Cove Trail",
         "description": "Only legal access to the shore of Crater Lake.",
         "distance": "2.2 miles",
         "elevationGain": "700 ft",
         "difficulty": "Strenuous",
         "trailType": "out-and-back",
         "dogFriendly": false,
         "season": "Summer"
       }
     }
  */
  try {
    const trail = await Trail.create(req.body);
    return res.status(201).json(trail);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while creating the trail."
    });
  }
};

const updateTrail = async (req, res) => {
  /* #swagger.tags = ['Trails']
     #swagger.description = 'Update a trail by its ID. Authentication required.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trail ObjectId',
       required: true,
       type: 'string'
     }
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Trail fields to update',
       schema: {
         "name": "Cleetwood Cove Trail",
         "description": "Updated description.",
         "difficulty": "Moderate",
         "dogFriendly": true
       }
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trail id." });
    }

    const trail = await Trail.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true
    });

    if (!trail) {
      return res.status(404).json({ error: "Trail not found." });
    }

    return res.status(200).json(trail);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while updating the trail."
    });
  }
};

const deleteTrail = async (req, res) => {
  /* #swagger.tags = ['Trails']
     #swagger.description = 'Delete a trail by its ID. Authentication required.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Trail ObjectId',
       required: true,
       type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trail id." });
    }

    const trail = await Trail.findByIdAndDelete(id);

    if (!trail) {
      return res.status(404).json({ error: "Trail not found." });
    }

    return res.status(200).json({ message: "Trail deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while deleting the trail."
    });
  }
};

module.exports = {
  getAllTrails,
  getTrailById,
  createTrail,
  updateTrail,
  deleteTrail
};
