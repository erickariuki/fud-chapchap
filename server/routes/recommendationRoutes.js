const express = require('express');
const router = express.Router();
const RecommendationsController = require('../controllers/RecommendationsController');
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/recommendations', authenticateUser, RecommendationsController.createRecommendation);
router.get('/recommendations', RecommendationsController.getRecommendations);

module.exports = router;
