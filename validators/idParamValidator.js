const { param } = require('express-validator');

const idParamRule = () => [
    param('id').isMongoId().withMessage('Invalid ID format.')
];

module.exports = idParamRule;
