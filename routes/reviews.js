const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");
const { reviewValidationRules, reviewQueryRules } = require("../validators/reviewsValidator");

router.get("/", reviewQueryRules(), validate, reviewsController.getAllReviews);
router.get("/:id", idParamRule(), validate, reviewsController.getReviewById);

router.post("/", isAuthenticated, reviewValidationRules(), validate, reviewsController.createReview);
router.put("/:id", isAuthenticated, idParamRule(), reviewValidationRules(true), validate, reviewsController.updateReview);
router.delete("/:id", isAuthenticated, idParamRule(), validate, reviewsController.deleteReview);

module.exports = router;
