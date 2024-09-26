const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/foodController');

// Route to create a new food item
router.post('/foods', FoodController.createFood);

router.get('/foods', FoodController.getAllFoods);
router.get('/foods/:id', FoodController.getFoodById);
router.put('/foods/:id', FoodController.updateFood);
router.delete('/foods/:id', FoodController.deleteFood);

module.exports = router;
