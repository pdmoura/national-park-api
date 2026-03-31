const mongoose = require('mongoose');
const Campground = require('../models/Campground');

const getAllCampgrounds = async (req, res) => {
    try {
        const filter = {};

        if (req.query.parkId) {
            if (!mongoose.Types.ObjectId.isValid(req.query.parkId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid parkId'
                });
            }

            filter.parkId = req.query.parkId;
        }

        const campgrounds = await Campground.find(filter);
        return res.status(200).json(campgrounds);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve campgrounds'
        });
    }
};

const getCampgroundById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid campground id'
            });
        }

        const campground = await Campground.findById(id);

        if (!campground) {
            return res.status(404).json({
                success: false,
                message: 'Campground not found'
            });
        }

        return res.status(200).json(campground);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve campground'
        });
    }
};

const createCampground = async (req, res) => {
    try {
        const campground = await Campground.create(req.body);

        return res.status(201).json({
            success: true,
            message: 'Campground created successfully',
            campground
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to create campground'
        });
    }
};

const updateCampground = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid campground id'
            });
        }

        const campground = await Campground.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!campground) {
            return res.status(404).json({
                success: false,
                message: 'Campground not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Campground updated successfully',
            campground
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to update campground'
        });
    }
};

const deleteCampground = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid campground id'
            });
        }

        const campground = await Campground.findByIdAndDelete(id);

        if (!campground) {
            return res.status(404).json({
                success: false,
                message: 'Campground not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Campground deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete campground'
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
