const express = require("express");
const router = express.Router();
const wildlifeController = require("../controllers/wildlife");

// GET all wildlife
// #swagger.tags = ['Wildlife']
router.get("/", wildlifeController.getAllWildlife);

// GET single wildlife
// #swagger.tags = ['Wildlife']
router.get("/:id", wildlifeController.getSingleWildlife);

// CREATE wildlife
// #swagger.tags = ['Wildlife']
router.post("/", wildlifeController.createWildlife);

// UPDATE wildlife
// #swagger.tags = ['Wildlife']
router.put("/:id", wildlifeController.updateWildlife);

// DELETE wildlife
// #swagger.tags = ['Wildlife']
router.delete("/:id", wildlifeController.deleteWildlife);

module.exports = router;