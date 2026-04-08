const express = require("express");
const router = express.Router();
const alertsController = require("../controllers/alerts");
const { isAuthenticated } = require("../middleware/auth");
const { writeLimiter } = require("../middleware/rateLimiter");
const idParamRule = require("../validators/idParamValidator");
const { createAlertRules } = require("../validators/alertsValidator");
const validate = require("../middleware/validate");

router.get("/", alertsController.getAllAlerts);
router.get("/:id", idParamRule(), validate, alertsController.getAlertById);
router.post("/", writeLimiter, isAuthenticated, createAlertRules(), validate, alertsController.createAlert);
router.put("/:id", writeLimiter, isAuthenticated, idParamRule(), createAlertRules(), validate, alertsController.updateAlert);
router.delete("/:id", writeLimiter, isAuthenticated, idParamRule(), validate, alertsController.deleteAlert);

module.exports = router;