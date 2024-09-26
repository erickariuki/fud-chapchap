const followSchema = new Schema({
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Followed', required: true },
    followed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Followed', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Follow', followSchema);