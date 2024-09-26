const Review = require('../models/Review');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ error: 'Reviews not found' });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const review = new Review({ ...req.body, user_id: req.user.id });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Get reviews for a specific restaurant
const getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant_id: req.params.restaurant_id }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ error: 'Reviews not found' });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user_id.equals(req.user.id)) {
      await review.update(req.body);
      res.status(200).json(review);
    } else {
      res.status(403).json({ error: 'Unauthorized action' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Review not found' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.user_id.equals(req.user.id)) {
      await review.remove();
      res.status(204).send();
    } else {
      res.status(403).json({ error: 'Unauthorized action' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Review not found' });
  }
};

// Get a specific review (for restaurants)
const getReviewForRestaurant = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user').populate('restaurant');
    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ error: 'Review not found' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getRestaurantReviews,
  updateReview,
  deleteReview,
  getReviewForRestaurant
};
