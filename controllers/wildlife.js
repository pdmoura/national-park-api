const mongoose = require("mongoose");
const Wildlife = require("../models/Wildlife");

const getAllWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Retrieve all wildlife with pagination, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
       in: 'query',
       description: 'Optional park ObjectId used to filter wildlife',
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

    const [wildlife, total] = await Promise.all([
      Wildlife.find(filter).skip(skip).limit(limit),
      Wildlife.countDocuments(filter)
    ]);

    return res.status(200).json({
      data: wildlife,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching wildlife."
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
      return res.status(400).json({ error: "Invalid wildlife id." });
    }

    const animal = await Wildlife.findById(id);

    if (!animal) {
      return res.status(404).json({ error: "Wildlife not found." });
    }

    return res.status(200).json(animal);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching the wildlife entry."
    });
  }
};

const createWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Create a new wildlife entry. Authentication required.'
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Wildlife object',
       required: true,
       schema: {
         "parkId": "64f1234567890abcde654321",
         "commonName": "American Black Bear",
         "scientificName": "Ursus americanus",
         "category": "mammal",
         "description": "The American black bear is a medium-sized bear.",
         "habitat": "Forests, mountains, and swamps",
         "conservationStatus": "Least Concern",
         "imageUrl": "https://example.com/black-bear.jpg"
       }
     }
  */
  try {
    const animal = await Wildlife.create(req.body);
    return res.status(201).json(animal);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while creating the wildlife entry."
    });
  }
};

const updateWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Update a wildlife entry by its ID. Authentication required.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Wildlife ObjectId',
       required: true,
       type: 'string'
     }
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Wildlife fields to update',
       schema: {
         "commonName": "Updated Name",
         "conservationStatus": "Vulnerable"
       }
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid wildlife id." });
    }

    const animal = await Wildlife.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true
    });

    if (!animal) {
      return res.status(404).json({ error: "Wildlife not found." });
    }

    return res.status(200).json(animal);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while updating the wildlife entry."
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
      return res.status(400).json({ error: "Invalid wildlife id." });
    }

    const animal = await Wildlife.findByIdAndDelete(id);

    if (!animal) {
      return res.status(404).json({ error: "Wildlife not found." });
    }

    return res.status(200).json({ message: "Wildlife entry deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while deleting the wildlife entry."
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
