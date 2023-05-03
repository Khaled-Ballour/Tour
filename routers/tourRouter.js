const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

router.route('/').get(tourController.getAllTours).post();
router.route('/:id').get().patch().delete();

module.exports = router;
