const express = require('express');
const router = express.Router();
const RatingsController = require('../controllers/RatingsController');
const authenticateUser = require('../middlewares/authenticateUser');

// Route to create a rating (user must be authenticated)
router.post('/restaurants/:restaurant_id/ratings', authenticateUser, RatingsController.createRating);
router.get('/restaurants/:restaurant_id/ratings', RatingsController.getRatings);

module.exports = router;
