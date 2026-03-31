const { body } = require('express-validator');
const mongoose = require('mongoose');

const campgroundValidationRules = (isUpdate = false) => {
    const field = (name) => (isUpdate ? body(name).optional() : body(name));

    return [
        field('parkId')
            .notEmpty()
            .withMessage('parkId is required.')
            .bail()
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('parkId must be a valid MongoDB ObjectId.'),

        field('name')
            .trim()
            .notEmpty()
            .withMessage('name is required.'),

        field('description')
            .trim()
            .notEmpty()
            .withMessage('description is required.'),

        body('reservationUrl')
            .optional({ values: 'falsy' })
            .trim()
            .isURL()
            .withMessage('reservationUrl must be a valid URL.'),

        field('numSites')
            .notEmpty()
            .withMessage('numSites is required.')
            .bail()
            .isInt({ min: 1 })
            .withMessage('numSites must be an integer greater than or equal to 1.'),

        field('cost')
            .trim()
            .notEmpty()
            .withMessage('cost is required.'),

        body('amenities')
            .optional({ values: 'falsy' })
            .trim(),

        field('season')
            .trim()
            .notEmpty()
            .withMessage('season is required.'),

        field('latitude')
            .trim()
            .notEmpty()
            .withMessage('latitude is required.'),

        field('longitude')
            .trim()
            .notEmpty()
            .withMessage('longitude is required.')
    ];
};

module.exports = campgroundValidationRules;
