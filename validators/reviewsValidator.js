const { body, query } = require("express-validator");
const mongoose = require("mongoose");

const reviewValidationRules = (isUpdate = false) => {
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

    field("rating")
      .notEmpty()
      .withMessage("rating is required.")
      .bail()
      .isInt({ min: 1, max: 5 })
      .withMessage("rating must be an integer between 1 and 5."),

    field("title")
      .trim()
      .notEmpty()
      .withMessage("title is required."),

    field("comment")
      .trim()
      .notEmpty()
      .withMessage("comment is required."),

    field("visitDate")
      .trim()
      .notEmpty()
      .withMessage("visitDate is required.")
  ];
};

const reviewQueryRules = () => [
  query("parkId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("parkId must be a valid MongoDB ObjectId.")
];

module.exports = { reviewValidationRules, reviewQueryRules };
