const { body, param, validationResult } = require('express-validator');

const parkRules = (isUpdate = false) => {
    const field = (name) => (isUpdate ? body(name).optional() : body(name));

    return [
        field('fullName')
            .trim()
            .notEmpty().withMessage('fullName cannot be empty')
            .isString().withMessage('fullName must be a string'),
        field('parkCode')
            .trim()
            .notEmpty().withMessage('parkCode cannot be empty')
            .isString().withMessage('parkCode must be a string'),
        field('description')
            .trim()
            .notEmpty().withMessage('description cannot be empty')
            .isString().withMessage('description must be a string'),
        field('state')
            .trim()
            .notEmpty().withMessage('state cannot be empty')
            .isString().withMessage('state must be a string'),
        field('region')
            .trim()
            .notEmpty().withMessage('region cannot be empty')
            .isString().withMessage('region must be a string'),
        field('latitude')
            .trim()
            .notEmpty().withMessage('latitude cannot be empty')
            .isString().withMessage('latitude must be a string'),
        field('longitude')
            .trim()
            .notEmpty().withMessage('longitude cannot be empty')
            .isString().withMessage('longitude must be a string'),

        body('url')
            .optional()
            .trim()
            .isString().withMessage('url must be a string'),
        body('imageUrl')
            .optional()
            .trim()
            .isString().withMessage('imageUrl must be a string'),
        body('established')
            .optional()
            .trim()
            .isString().withMessage('established must be a string'),
        body('area')
            .optional()
            .trim()
            .isString().withMessage('area must be a string')
    ];
};

const idParamRule = () => [
    param('id').isMongoId().withMessage('Invalid ID format.')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { parkRules, idParamRule, validate };
