const express = require("express");
const idParamRule = require("../validators/idParamValidator");
const { isAuthenticated } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();
const {
  getAllWildlife,
  getWildlifeById,
  createWildlife,
  updateWildlife,
  deleteWildlife,
} = require("../controllers/wildlife");

router.get("/", getAllWildlife);
router.get("/:id",idParamRule(), validate, getWildlifeById);
router.post("/", isAuthenticated, validate, createWildlife);
router.put("/:id", idParamRule(), isAuthenticated, validate, updateWildlife);
router.delete("/:id", idParamRule(), isAuthenticated, validate, deleteWildlife);

module.exports = router;
