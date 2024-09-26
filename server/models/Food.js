const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  foodtype: { type: Number },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  cuisine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' },
  image: { type: String, default: 'one.jpg' },
  discount_price: { type: Number },
  category: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Update the updated_at field before saving
foodSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Food', foodSchema);
