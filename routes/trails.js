const express = require("express");
const router = express.Router();
const trailsController = require("../controllers/trails");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");
const { trailValidationRules, trailQueryRules } = require("../validators/trailsValidator");

router.get("/", trailQueryRules(), validate, trailsController.getAllTrails);
router.get("/:id", idParamRule(), validate, trailsController.getTrailById);
router.post("/", isAuthenticated, trailValidationRules(), validate, trailsController.createTrail);
router.put("/:id", isAuthenticated, idParamRule(), trailValidationRules(true), validate, trailsController.updateTrail);
router.delete("/:id", isAuthenticated, idParamRule(), validate, trailsController.deleteTrail);

module.exports = router;
