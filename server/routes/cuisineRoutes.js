const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');

// Route to create a new cuisine
router.post('/cuisines', cuisineController.createCuisine);
router.get('/cuisines', cuisineController.getAllCuisines);
router.put('/cuisines/:id', cuisineController.updateCuisine);
router.delete('/cuisines/:id', cuisineController.deleteCuisine);

module.exports = router;
