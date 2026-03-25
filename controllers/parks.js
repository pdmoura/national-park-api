const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validatePark = (body) => {
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
    // swagger.tags = ['Parks']
    try {
        const result = await mongodb.getDatabase().collection('parks').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching parks.' });
    }
};

const getSingle = async (req, res) => {
    // swagger.tags = ['Parks']
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
    // swagger.tags = ['Parks']
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
    // swagger.tags = ['Parks']
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
    // swagger.tags = ['Parks']
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
