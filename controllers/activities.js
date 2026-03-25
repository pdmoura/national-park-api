const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const validateActivity = (body) => {
    const errors = [];
    const required = ['name', 'description', 'parkCode', 'duration', 'difficulty', 'season'];
    for (const field of required) {
        if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
            errors.push(`${field} is required and must be a non-empty string.`);
        }
    }
    return errors;
};

const getAll = async (req, res) => {
    // swagger.tags = ['Activities']
    try {
        const filter = {};
        if (req.query.parkCode) {
            filter.parkCode = req.query.parkCode;
        }
        const result = await mongodb.getDatabase().collection('activities').find(filter).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching activities.' });
    }
};

const getSingle = async (req, res) => {
    // swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const activityId = new ObjectId(req.params.id);
        const activity = await mongodb.getDatabase().collection('activities').findOne({ _id: activityId });
        if (!activity) return res.status(404).json({ error: 'Activity not found.' });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while fetching the activity.' });
    }
};

const createActivity = async (req, res) => {
    // swagger.tags = ['Activities']
    try {
        const errors = validateActivity(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const activity = {
            name: req.body.name,
            description: req.body.description,
            parkCode: req.body.parkCode,
            duration: req.body.duration,
            difficulty: req.body.difficulty,
            season: req.body.season
        };

        const response = await mongodb.getDatabase().collection('activities').insertOne(activity);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the activity.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while creating the activity.' });
    }
};

const updateActivity = async (req, res) => {
    // swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const errors = validateActivity(req.body);
        if (errors.length > 0) return res.status(400).json({ errors });

        const activityId = new ObjectId(req.params.id);
        const activity = {
            name: req.body.name,
            description: req.body.description,
            parkCode: req.body.parkCode,
            duration: req.body.duration,
            difficulty: req.body.difficulty,
            season: req.body.season
        };

        const response = await mongodb.getDatabase().collection('activities').replaceOne({ _id: activityId }, activity);
        if (response.modifiedCount > 0) {
            res.status(200).json({ id: activityId });
        } else {
            res.status(500).json({ error: 'Some error occurred while updating the activity.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while updating the activity.' });
    }
};

const deleteActivity = async (req, res) => {
    // swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        const activityId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('activities').deleteOne({ _id: activityId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the activity.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || 'An error occurred while deleting the activity.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createActivity,
    updateActivity,
    deleteActivity
};
