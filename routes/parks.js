const express = require("express");
const router = express.Router();
const parksController = require("../controllers/parks");
const { isAuthenticated } = require("../middleware/auth");
const { writeLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const parkRules = require("../validators/parksValidator");
const idParamRule = require("../validators/idParamValidator");

router.get("/", parksController.getAll);
router.get("/:id", idParamRule(), validate, parksController.getSingle);
router.post("/", writeLimiter, isAuthenticated, parkRules(), validate, parksController.createPark);
router.put("/:id", writeLimiter, isAuthenticated, idParamRule(), parkRules(true), validate, parksController.updatePark);
router.delete("/:id", writeLimiter, isAuthenticated, idParamRule(), validate, parksController.deletePark);

module.exports = router;
