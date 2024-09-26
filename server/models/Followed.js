const followedSchema = new Schema({
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Followed', followedSchema);