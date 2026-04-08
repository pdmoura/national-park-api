const express = require("express");
const router = express.Router();

const campgroundsController = require("../controllers/campgrounds");
const { isAuthenticated } = require("../middleware/auth");
const { writeLimiter } = require("../middleware/rateLimiter");
const campgroundValidationRules = require("../validators/campgroundsValidator");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");

router.get("/", campgroundsController.getAllCampgrounds);
router.get("/:id", idParamRule(), validate, campgroundsController.getCampgroundById);
router.post("/", writeLimiter, isAuthenticated, campgroundValidationRules(), validate, campgroundsController.createCampground);
router.put("/:id", writeLimiter, isAuthenticated, idParamRule(), campgroundValidationRules(true), validate, campgroundsController.updateCampground);
router.delete("/:id", writeLimiter, isAuthenticated, idParamRule(), validate, campgroundsController.deleteCampground);

module.exports = router;
