const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reply', replySchema);
