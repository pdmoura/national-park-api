const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");

router.get("/", reviewsController.getAllReviews);
router.get("/:id", idParamRule(), validate, reviewsController.getReviewById);
router.post("/", isAuthenticated, reviewsController.createReview);
router.put("/:id", isAuthenticated, idParamRule(), validate, reviewsController.updateReview);
router.delete("/:id", isAuthenticated, idParamRule(), validate, reviewsController.deleteReview);

module.exports = router;
