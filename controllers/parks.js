const Park = require("../models/Park");

const getAll = async (req, res) => {
  // #swagger.tags = ['Parks']
  // #swagger.description = 'Retrieve all parks'
  try {
    const parks = await Park.find();
    res.status(200).json(parks);
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while fetching parks." });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Parks']
  // #swagger.description = 'Retrieve a single park by its ID'
  try {
    const park = await Park.findById(req.params.id);
    if (!park) return res.status(404).json({ error: "Park not found." });
    res.status(200).json(park);
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while fetching the park." });
  }
};

const createPark = async (req, res) => {
  /* #swagger.tags = ['Parks']
     #swagger.description = 'Create a new park'
     #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Park object',
        required: true,
        schema: {
            "fullName": "Crater Lake National Park",
            "parkCode": "crla",
            "description": "Crater Lake inspires awe. Deepest lake in the USA.",
            "state": "Oregon",
            "region": "Pacific West",
            "latitude": "42.94065854",
            "longitude": "-122.1338414",
            "url": "https://www.nps.gov/crla/index.htm",
            "imageUrl": "https://example.com/crater-lake.jpg",
            "established": "1902",
            "area": "183224"
        }
    }*/
  try {
    const park = await Park.create(req.body);
    res.status(201).json(park);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "An error occurred while creating the park." });
  }
};

const updatePark = async (req, res) => {
  // #swagger.tags = ['Parks']
  // #swagger.description = 'Update a park by its ID'
  /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Park object',
        schema: {
            "fullName": "Crater Lake National Park",
            "parkCode": "crla",
            "description": "Crater Lake inspires awe. Deepest lake in the USA.",
            "state": "Idaho"
        }
    }
    */
    try {
        const park = await Park.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true
        });
        if (!park) return res.status(404).json({ error: 'Park not found.' });
        res.status(200).json(park);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message || 'An error occurred while updating the park.' });
    }
    res.status(500).json({ error: err.message || "An error occurred while updating the park." });
  }
};

const deletePark = async (req, res) => {
  // #swagger.tags = ['Parks']
  // #swagger.description = 'Delete a park by its ID'
  try {
    const park = await Park.findByIdAndDelete(req.params.id);
    if (!park) return res.status(404).json({ error: "Park not found." });
    res.status(200).json({ message: "Park deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message || "An error occurred while deleting the park." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPark,
  updatePark,
  deletePark
};
