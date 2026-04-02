const express = require("express");
const router = express.Router();
const adventuresController = require("../controllers/adventures");
const { isAuthenticated } = require("../middleware/auth");
const { idParamRule, validate } = require("../middleware/validate");

router.get("/", adventuresController.getAllAdventures);
router.get("/:id", idParamRule(), validate, adventuresController.getAdventureById);
router.post("/", isAuthenticated, adventuresController.createAdventure);
router.put("/:id", isAuthenticated, idParamRule(), validate, adventuresController.updateAdventure);
router.delete("/:id", isAuthenticated, idParamRule(), validate, adventuresController.deleteAdventure);

module.exports = router;
