const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    brand: { type: String },
    location: { type: String },
    phone_number: { type: String },
    image: { type: String },
    permit_file: { type: String },
    password_digest: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
