const express = require('express');
const router = express.Router();
const RestaurantsController = require('../controllers/restaurantsController');
const authenticateRestaurant = require('../middlewares/authenticateRestaurant');

// Route to get all restaurants
router.get('/restaurants', RestaurantsController.getAllRestaurants);

router.post('/restaurants', authenticateRestaurant, RestaurantsController.createRestaurant);
router.post('/restaurants/login', RestaurantsController.loginRestaurant);
router.get('/restaurants/me', authenticateRestaurant, RestaurantsController.showCurrentRestaurant);
router.put('/restaurants/me', authenticateRestaurant, RestaurantsController.updateRestaurant);
router.get('/restaurants/me/foods', authenticateRestaurant, RestaurantsController.getFoods); // Fix casing
router.post('/restaurants/me/foods', authenticateRestaurant, RestaurantsController.createFood); // Fix casing
router.delete('/restaurants/me/foods/:id', authenticateRestaurant, RestaurantsController.deleteFood); // Fix casing

module.exports = router;
