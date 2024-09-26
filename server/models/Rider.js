const mongoose = require('mongoose');
const { Schema } = mongoose;

const riderSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  id_number: { type: Number },
  phone_number: { type: String },
  brand: { type: String },
  location: { type: String },
  image: { type: String },
  id_photo: { type: String },
  password_digest: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider; // Export using CommonJS syntax
