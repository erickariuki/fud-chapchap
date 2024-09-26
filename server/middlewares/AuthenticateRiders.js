// middlewares/authenticateRider.js
const jwt = require('jsonwebtoken');
const Rider = require('../models/Rider');

const authenticateRider = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rider = await Rider.findById(decoded.id);

    if (!rider) {
      return res.status(401).json({ error: 'Rider not found' });
    }

    req.rider = rider;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateRider;