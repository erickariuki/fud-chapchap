// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Friends Schema
// const friendSchema = new Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   friend_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now }
// });

// // Export the Friends model
// module.exports = mongoose.model('Friend', friendSchema);
