
const mongoose = require('mongoose'); // Import mongoose

const commentSchema = new mongoose.Schema({ // Use mongoose.Schema
  content: { type: String, required: true }, // Comment content
  likes: { type: Number, default: 0 }, // Number of likes, defaults to 0
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }, // Reference to Blog model
  created_at: { type: Date, default: Date.now }, // Auto-generated creation timestamp
  updated_at: { type: Date, default: Date.now } // Auto-updated modification timestamp
});

// Export the model
module.exports = mongoose.model('Comment', commentSchema);
