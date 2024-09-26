// models/Rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  restaurant_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  }, // Reference to Restaurant model
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to User model
  rating_value: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  }, // Rating value, should be between 1 and 5
  created_at: { 
    type: Date, 
    default: Date.now 
  } // Auto-generated creation timestamp
});

// Export the model
module.exports = mongoose.model('Rating', ratingSchema);
