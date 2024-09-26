const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  password_digest: { type: String, required: true },
  image: { type: String },
  address: { type: String },
  reset_password_token: { type: String },
  reset_password_sent_at: { type: Date },
  remember_created_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); // Export using CommonJS syntax
