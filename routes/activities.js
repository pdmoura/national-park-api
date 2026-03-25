const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', activitiesController.getAll);
router.get('/:id', activitiesController.getSingle);
router.post('/', isAuthenticated, activitiesController.createActivity);
router.put('/:id', isAuthenticated, activitiesController.updateActivity);
router.delete('/:id', isAuthenticated, activitiesController.deleteActivity);

module.exports = router;
