const express = require("express");
const router = express.Router();
const adventuresController = require("../controllers/adventures");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");
const { adventureValidationRules, adventureQueryRules } = require("../validators/adventuresValidator");

router.get("/", adventureQueryRules(), validate, adventuresController.getAllAdventures);
router.get("/:id", idParamRule(), validate, adventuresController.getAdventureById);
router.post("/", isAuthenticated, adventureValidationRules(), validate, adventuresController.createAdventure);
router.put("/:id", isAuthenticated, idParamRule(), adventureValidationRules(true), validate, adventuresController.updateAdventure);
router.delete("/:id", isAuthenticated, idParamRule(), validate, adventuresController.deleteAdventure);

module.exports = router;
