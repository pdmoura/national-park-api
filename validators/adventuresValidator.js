const { body, query } = require("express-validator");
const mongoose = require("mongoose");

const adventureValidationRules = (isUpdate = false) => {
  const field = (name) => (isUpdate ? body(name).optional() : body(name));

  return [
    field("parkId")
      .notEmpty()
      .withMessage("parkId is required.")
      .bail()
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("parkId must be a valid MongoDB ObjectId."),

    field("userId")
      .trim()
      .notEmpty()
      .withMessage("userId is required."),

    field("title")
      .trim()
      .notEmpty()
      .withMessage("title is required."),

    field("description")
      .trim()
      .notEmpty()
      .withMessage("description is required."),

    field("date")
      .trim()
      .notEmpty()
      .withMessage("date is required."),

    field("type")
      .trim()
      .notEmpty()
      .withMessage("type is required.")
      .bail()
      .isIn(["hike", "camp", "scenic drive", "wildlife viewing"])
      .withMessage("type must be one of: hike, camp, scenic drive, wildlife viewing."),

    field("duration")
      .trim()
      .notEmpty()
      .withMessage("duration is required."),

    field("difficulty")
      .trim()
      .notEmpty()
      .withMessage("difficulty is required.")
      .bail()
      .isIn(["Easy", "Moderate", "Strenuous"])
      .withMessage("difficulty must be one of: Easy, Moderate, Strenuous."),

    field("rating")
      .notEmpty()
      .withMessage("rating is required.")
      .bail()
      .isInt({ min: 1, max: 5 })
      .withMessage("rating must be an integer between 1 and 5.")
  ];
};

const adventureQueryRules = () => [
  query("parkId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("parkId must be a valid MongoDB ObjectId.")
];

module.exports = { adventureValidationRules, adventureQueryRules };
