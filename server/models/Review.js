// models/Review.js

const mongoose = require('mongoose'); // Ensure mongoose is required

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Reference to Restaurant model
  review: { type: String, required: true }, // The actual review text
  rate: { type: Number, required: true }, // Rating for the restaurant
  created_at: { type: Date, default: Date.now }, // Auto-generated creation timestamp
  updated_at: { type: Date, default: Date.now }  // Auto-updated modification timestamp
});

// Export the model
module.exports = mongoose.model('Review', reviewSchema);
