// models/Yummypoint.js

const mongoose = require('mongoose'); // Ensure mongoose is required at the top

const yummyPointSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  point: { type: Number, required: true }, // The points assigned to the user
  created_at: { type: Date, default: Date.now }, // Auto-generated creation date
  updated_at: { type: Date, default: Date.now }  // Auto-updated modification date
});

// Export the model
module.exports = mongoose.model('YummyPoint', yummyPointSchema);
