const express = require("express");
const router = express.Router();

const campgroundsController = require("../controllers/campgrounds");
const { isAuthenticated } = require("../middleware/auth");
const campgroundValidationRules = require("../validators/campgroundsValidator");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");

router.get("/", campgroundsController.getAllCampgrounds);
router.get("/:id", idParamRule(), validate, campgroundsController.getCampgroundById);
router.post("/", isAuthenticated, campgroundValidationRules(), validate, campgroundsController.createCampground);
router.put("/:id", isAuthenticated, idParamRule(), campgroundValidationRules(true), validate, campgroundsController.updateCampground);
router.delete("/:id", isAuthenticated, idParamRule(), validate, campgroundsController.deleteCampground);

module.exports = router;
