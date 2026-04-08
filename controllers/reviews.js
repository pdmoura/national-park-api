const mongoose = require("mongoose");
const Review = require("../models/Review");
const Park = require("../models/Park");

const getAllReviews = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Retrieve all reviews with pagination, optionally filtered by parkId'
     #swagger.parameters['parkId'] = {
       in: 'query',
       description: 'Optional park ObjectId used to filter reviews',
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

    const [reviews, total] = await Promise.all([
      Review.find(filter).skip(skip).limit(limit),
      Review.countDocuments(filter)
    ]);

    return res.status(200).json({
      data: reviews,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching reviews."
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
       type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid review id." });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching the review."
    });
  }
};

const createReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Create a new review. Authentication required.'
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Review object',
       required: true,
       schema: {
         "parkId": "64f1234567890abcde654321",
         "userId": "github12345",
         "rating": 5,
         "title": "Breathtaking Views",
         "comment": "One of the most beautiful places I have ever visited.",
         "visitDate": "2025-07-20"
       }
     }
  */
  try {
    const review = await Review.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while creating the review."
    });
  }
};

const updateReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Update a review by its ID. Authentication required.'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review ObjectId',
       required: true,
       type: 'string'
     }
     #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Review fields to update',
       schema: {
         "rating": 4,
         "title": "Updated Title",
         "comment": "Updated comment."
       }
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid review id." });
    }

    const review = await Review.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json(review);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while updating the review."
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
       type: 'string'
     }
  */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid review id." });
    }

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while deleting the review."
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
