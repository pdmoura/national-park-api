const express = require("express");
const router = express.Router();
const wildlifeController = require("../controllers/wildlife");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");
const { wildlifeValidationRules, wildlifeQueryRules } = require("../validators/wildlifeValidator");

router.get("/", wildlifeQueryRules(), validate, wildlifeController.getAllWildlife);
router.get("/:id", idParamRule(), validate, wildlifeController.getWildlifeById);
router.post("/", isAuthenticated, wildlifeValidationRules(), validate, wildlifeController.createWildlife);
router.put("/:id", isAuthenticated, idParamRule(), wildlifeValidationRules(true), validate, wildlifeController.updateWildlife);
router.delete("/:id", isAuthenticated, idParamRule(), validate, wildlifeController.deleteWildlife);

module.exports = router;
