const mongoose = require('mongoose');  // Import mongoose
const Schema = mongoose.Schema;        // Extract Schema from mongoose

const orderSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String },
    order_type: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
