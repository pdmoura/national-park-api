const mongoose = require("mongoose");
const Wildlife = require("../models/wildlife");

// GET all wildlife (optionally filter by parkId)
const getAllWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife'] 
    #swagger.description = 'Retrieve all wildlife, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
       in: 'query',
       description: 'Optional wildlife ObjectId used to filter trails',
       required: false,
       type: 'string'
     }
  */
  try {
    const filter = {};
    if (req.query.parkId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.parkId)) {
        return res.status(400).json({ error: "Invalid parkId" });
      }
      filter.parkId = req.query.parkId;
    }
    const wildlife = await Wildlife.find(filter);
    res.json(wildlife);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// GET wildlife by ID
const getWildlifeById = async (req, res) => {
  /* #swagger.tags = ['Wildlife'] 
    #swagger.description = 'Retrieve a single wildlife by its ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Wildlife ObjectId',
       required: true,
       type: 'string'
     }
   */
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const species = await Wildlife.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ error: "Wildlife not found" });
    }
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// CREATE wildlife
const createWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
    #swagger.description = 'Create a new wildlife species. Authentication required.'
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Wildlife object',
        required: true,
        schema: {
        "parkId": "64f1234567890abcde654321",
        "commonName": "Bald Eagle",
        "scientificName": "Haliaeetus leucocephalus",
        "category": "bird",
        "description": "Large bird of prey found near lakes and rivers.",
        "habitat": "Forests, wetlands, and coastal regions",
        "conservationStatus": "Least Concern",
        "imageUrl": "https://example.com/bald-eagle.jpg"
        }
    }
    */

  try {
    const species = await Wildlife.create(req.body);
    res.status(201).json(species);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE wildlife
const updateWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
   #swagger.description = 'Update an existing wildlife species. Authentication required.'
   #swagger.parameters['id'] = {
     in: 'path',
     description: 'Wildlife ObjectId',
     required: true,
     type: 'string',
     example: '64f1234567890abcde654321'
   }
   #swagger.parameters['obj'] = {
     in: 'body',
     description: 'Wildlife fields to update',
     required: true,
     schema: {
       "commonName": "Updated Bald Eagle",
       "scientificName": "Haliaeetus leucocephalus",
       "category": "bird",
       "description": "Updated description of the species.",
       "habitat": "Updated habitat information",
       "conservationStatus": "Endangered",
       "imageUrl": "https://example.com/updated-bald-eagle.jpg"
     }
   }
*/

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const species = await Wildlife.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!species) {
      return res.status(404).json({ error: "Wildlife not found" });
    }
    res.json(species);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE wildlife
const deleteWildlife = async (req, res) => {
  /* #swagger.tags = ['Wildlife']
     #swagger.description = 'Delete a wildlife by its ID. Authentication required.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Wildlife ObjectId',
       required: true,
       type: 'string'
     }
  */
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const species = await Wildlife.findByIdAndDelete(req.params.id);
    if (!species) {
      return res.status(404).json({ error: "Wildlife not found" });
    }
    res.json({ message: "Wildlife deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

module.exports = {
  getAllWildlife,
  getWildlifeById,
  createWildlife,
  updateWildlife,
  deleteWildlife,
};
