const Recommendation = require('../models/Recommendation');
const authenticateUser = require('../middlewares/authenticateUser');

// Create a recommendation
const createRecommendation = async (req, res) => {
  try {
    const recommendation = new Recommendation({ ...req.body, user: req.user.id });
    await recommendation.save();
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Get all recommendations
const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(404).json({ error: 'Recommendations not found' });
  }
};

// Middleware function to authenticate user
const authenticateAndHandleRecommendations = async (req, res, next) => {
  try {
    await authenticateUser(req, res, () => next());
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Export functions for use in other parts of the application
module.exports = {
  createRecommendation,
  getRecommendations,
  authenticateAndHandleRecommendations,
};
