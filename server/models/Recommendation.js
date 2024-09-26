// models/Recommendation.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Recommendation schema
const recommendationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Recommendation model
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
