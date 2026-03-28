const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validatePark = (body) => {
    // #swagger.tags = ['Parks']
    const errors = [];
    const required = ['description', 'fullName', 'latLong', 'latitude', 'longitude', 'parkCode', 'url'];
    for (const field of required) {
        if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
            errors.push(`${field} is required and must be a non-empty string.`);
        }
    }
    return errors;
};

const getAll = async (req, res) => {
    // #swagger.tags = ['Parks']
    // #swagger.description = 'Retrieve all parks'
    try {
        const result = await mongodb.getDatabase().collection('parks').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching parks.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Parks']
    // #swagger.description = 'Retrieve a single park by its ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const parkId = new ObjectId(req.params.id);
        const park = await mongodb.getDatabase().collection('parks').findOne({ _id: parkId });
        if (!park) return res.status(404).json({ error: 'Park not found.' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(park);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching the park.' });
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
        const errors = validatePark(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const park = {
            description: req.body.description,
            fullName: req.body.fullName,
            latLong: req.body.latLong,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            parkCode: req.body.parkCode,
            url: req.body.url
        };

        const response = await mongodb.getDatabase().collection('parks').insertOne(park);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the park.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while creating the park.' });
    }
};

const updatePark = async (req, res) => {
    // #swagger.tags = ['Parks']
    // #swagger.description = 'Update a park by its ID'
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Park object',
        required: true,
        schema: {
            "fullName": "Crater Lake National Park",
            "parkCode": "crla",
            "description": "Crater Lake inspires awe. Deepest lake in the USA.",
            "state": "Idaho"
        }
    }
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const errors = validatePark(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const parkId = new ObjectId(req.params.id);
        const park = {
            description: req.body.description,
            fullName: req.body.fullName,
            latLong: req.body.latLong,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            parkCode: req.body.parkCode,
            url: req.body.url
        };

        const response = await mongodb.getDatabase().collection('parks').replaceOne({ _id: parkId }, park);
        if (response.modifiedCount > 0) {
            res.status(200).json({ id: parkId });
        } else {
            res.status(500).json({ error: 'Some error occurred while updating the park.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while updating the park.' });
    }
};

const deletePark = async (req, res) => {
    // #swagger.tags = ['Parks']
    // #swagger.description = 'Delete a park by its ID'
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const parkId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('parks').deleteOne({ _id: parkId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the park.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while deleting the park.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPark,
    updatePark,
    deletePark
};
