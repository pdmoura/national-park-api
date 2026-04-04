const { body } = require("express-validator");

const createAlertRules = () => {
  return [
    body("parkId")
      .notEmpty()
      .withMessage("parkId is required"),
        
    body("title")
      .notEmpty()
      .withMessage("title is required"),
        
    body("description")
      .notEmpty()
      .withMessage("description is required"),
        
    body("category")
      .notEmpty()
      .withMessage("category is required"),
        
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean")
  ];
};

module.exports = {
  createAlertRules
};