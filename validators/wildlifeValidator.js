const { body, query } = require("express-validator");
const mongoose = require("mongoose");

const wildlifeValidationRules = (isUpdate = false) => {
  const field = (name) => (isUpdate ? body(name).optional() : body(name));

  return [
    field("parkId")
      .notEmpty()
      .withMessage("parkId is required.")
      .bail()
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("parkId must be a valid MongoDB ObjectId."),

    field("commonName")
      .trim()
      .notEmpty()
      .withMessage("commonName is required."),

    field("scientificName")
      .trim()
      .notEmpty()
      .withMessage("scientificName is required."),

    field("category")
      .trim()
      .notEmpty()
      .withMessage("category is required.")
      .bail()
      .isIn(["mammal", "bird", "fish", "reptile", "amphibian"])
      .withMessage("category must be one of: mammal, bird, fish, reptile, amphibian."),

    field("description")
      .trim()
      .notEmpty()
      .withMessage("description is required."),

    field("habitat")
      .trim()
      .notEmpty()
      .withMessage("habitat is required."),

    field("conservationStatus")
      .trim()
      .notEmpty()
      .withMessage("conservationStatus is required."),

    body("imageUrl")
      .optional({ values: "falsy" })
      .trim()
      .isURL()
      .withMessage("imageUrl must be a valid URL.")
  ];
};

const wildlifeQueryRules = () => [
  query("parkId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("parkId must be a valid MongoDB ObjectId.")
];

module.exports = { wildlifeValidationRules, wildlifeQueryRules };
