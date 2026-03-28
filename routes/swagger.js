const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
// #swagger.ignore = true
router.get('/api-docs', (req, res) => {
  // #swagger.ignore = true
  /* #swagger.ignore = true */
  swaggerUi.setup(swaggerDocument)(req, res);
});

module.exports = router;