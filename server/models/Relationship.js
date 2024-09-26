const relationshipSchema = new Schema({
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Relationship', relationshipSchema);