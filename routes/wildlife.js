const express = require("express");
const router = express.Router();
const wildlifeController = require("../controllers/wildlife");
const { isAuthenticated } = require("../middleware/auth");
const idParamRule = require("../validators/idParamValidator");
const validate = require("../middleware/validate");

router.get("/", wildlifeController.getAllWildlife);
router.get("/:id", idParamRule(), validate, wildlifeController.getWildlifeById);
router.post("/", isAuthenticated, wildlifeController.createWildlife);
router.put("/:id", isAuthenticated, idParamRule(), validate, wildlifeController.updateWildlife);
router.delete("/:id", isAuthenticated, idParamRule(), validate, wildlifeController.deleteWildlife);

module.exports = router;
