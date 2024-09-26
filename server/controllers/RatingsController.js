const express = require('express');
const Rating = require('../models/Rating');
const authenticateUser = require('../middlewares/authenticateUser');

// Create a rating
const createRating = async (req, res) => {
  try {
    const { user_id, rating_value } = req.body;
    const { restaurant_id } = req.params;

    const rating = new Rating({
      restaurant_id,
      user_id,
      rating_value,
    });

    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Get all ratings for a restaurant and calculate the average rating
const getRatings = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const ratings = await Rating.find({ restaurant_id });

    if (ratings.length === 0) {
      return res.status(404).json({ error: 'No ratings found for this restaurant' });
    }

    const averageRating = ratings.reduce((acc, rating) => acc + rating.rating_value, 0) / ratings.length;
    res.status(200).json({ averageRating, ratings });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ratings', details: error.message });
  }
};

// Middleware function to authenticate user
const authenticateAndHandleRating = async (req, res, next) => {
  try {
    await authenticateUser(req, res, () => next());
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Export functions for use in other parts of the application
module.exports = {
  createRating,
  getRatings,
  authenticateAndHandleRating,
};
