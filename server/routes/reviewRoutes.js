
const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/ReviewController');
const authenticateUser = require('../middlewares/authenticateUser');
const authenticateRestaurant = require('../middlewares/authenticateRestaurant');

// Route to get all reviews
router.get('/reviews', ReviewsController.getAllReviews);

router.post('/reviews', authenticateUser, ReviewsController.createReview);
router.get('/restaurants/:restaurant_id/reviews', ReviewsController.getRestaurantReviews);
router.put('/reviews/:id', authenticateUser, ReviewsController.updateReview);
router.delete('/reviews/:id', authenticateUser, ReviewsController.deleteReview);
router.get('/reviews/:id', ReviewsController.getReviewForRestaurant);

module.exports = router;
