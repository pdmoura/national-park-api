const express = require('express');
const router = express.Router();
const parksController = require('../controllers/parks');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', parksController.getAll);
router.get('/:id', parksController.getSingle);
router.post('/', isAuthenticated, parksController.createPark);
router.put('/:id', isAuthenticated, parksController.updatePark);
router.delete('/:id', isAuthenticated, parksController.deletePark);

module.exports = router;
