// middlewares/authenticateRestaurant.js
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');

const authenticateRestaurant = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const restaurant = await Restaurant.findById(decoded.id);

    if (!restaurant) {
      return res.status(401).json({ error: 'Restaurant not found' });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateRestaurant;