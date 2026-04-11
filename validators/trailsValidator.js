const { body, query } = require("express-validator");
const mongoose = require("mongoose");

const trailValidationRules = (isUpdate = false) => {
  const field = (name) => (isUpdate ? body(name).optional() : body(name));

  return [
    field("parkId")
      .notEmpty()
      .withMessage("parkId is required.")
      .bail()
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("parkId must be a valid MongoDB ObjectId."),

    field("name")
      .trim()
      .notEmpty()
      .withMessage("name is required."),

    field("description")
      .trim()
      .notEmpty()
      .withMessage("description is required."),

    field("distance")
      .trim()
      .notEmpty()
      .withMessage("distance is required."),

    field("elevationGain")
      .trim()
      .notEmpty()
      .withMessage("elevationGain is required."),

    field("difficulty")
      .trim()
      .notEmpty()
      .withMessage("difficulty is required.")
      .bail()
      .isIn(["Easy", "Moderate", "Strenuous"])
      .withMessage("difficulty must be one of: Easy, Moderate, Strenuous."),

    field("trailType")
      .trim()
      .notEmpty()
      .withMessage("trailType is required.")
      .bail()
      .isIn(["out-and-back", "loop", "point-to-point"])
      .withMessage("trailType must be one of: out-and-back, loop, point-to-point."),

    field("dogFriendly")
      .notEmpty()
      .withMessage("dogFriendly is required.")
      .bail()
      .isBoolean()
      .withMessage("dogFriendly must be a boolean."),

    field("season")
      .trim()
      .notEmpty()
      .withMessage("season is required.")
  ];
};

const trailQueryRules = () => [
  query("parkId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("parkId must be a valid MongoDB ObjectId.")
];

module.exports = { trailValidationRules, trailQueryRules };
