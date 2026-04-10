const mongoose = require("mongoose");
const Review = require("../models/Review");
const Park = require("../models/Park");

const getAllReviews = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Retrieve all reviews, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
        in: 'query',
        description: 'Optional park ObjectId used to filter reviews',
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

      // Optional: Verify the park actually exists before filtering
      const park = await Park.findById(req.query.parkId);
      if (!park) {
        return res.status(404).json({
          success: false,
          message: "Park not found"
        });
      }
    }

    const reviews = await Review.find(filter);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve reviews"
    });
  }
};

const getReviewById = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Retrieve a single review by its ID'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Review ObjectId',
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
        message: "Invalid review id"
      });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve review"
    });
  }
};

const createReview = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Create a new review. Authentication required.'
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Review object',
      required: true,
      schema: {
          "parkId": "64b9f2b8a4b8a7c2d8291f11",
          "userId": "github12345",
          "rating": 5,
          "title": "Breathtaking views",
          "comment": "Absolutely beautiful park!",
          "visitDate": "2023-07-20"
      }
  } */
  try {
    const review = await Review.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review
    });
  } catch (error) {
    // Catches Mongoose schema validation errors (e.g., rating < 1 or > 5)
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
      message: error.message || "Failed to create review"
    });
  }
};

const updateReview = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.description = 'Update an existing review by its ID. Authentication required.'
  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'Review ObjectId',
      required: true,
      type: 'string',
      example: '64f1234567890abcde123456'
  } */
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Review fields to update',
      schema: {
          "rating": 4,
          "comment": "Updated comment."
      }
  } */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id"
      });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true // Ensures Mongoose re-runs the min:1 max:5 rating validation on update
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review
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
      message: error.message || "Failed to update review"
    });
  }
};

const deleteReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Delete a review by its ID. Authentication required.'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'Review ObjectId',
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
        message: "Invalid review id"
      });
    }

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete review"
    });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
