const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const authenticateUser = require('../middlewares/authenticateUser');

// Function to create a reply for a comment
const createReply = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const replyData = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const reply = new Reply({ ...replyData, user: userId });

    comment.replies.push(reply);
    await comment.save();
    await reply.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(422).json({ error: 'Reply could not be created', details: error.message });
  }
};

// Function to update a reply
const updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    if (reply.user.equals(userId)) {
      Object.assign(reply, updateData);
      await reply.save();
      res.status(200).json(reply);
    } else {
      res.status(403).json({ error: 'Unauthorized to update this reply' });
    }
  } catch (error) {
    res.status(422).json({ error: 'Reply could not be updated', details: error.message });
  }
};

// Function to delete a reply
const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    if (reply.user.equals(userId)) {
      await reply.remove();
      res.status(204).send(); // No content
    } else {
      res.status(403).json({ error: 'Unauthorized to delete this reply' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Reply not found', details: error.message });
  }
};

// Function to like a reply
const likeReply = async (req, res) => {
  try {
    const { id } = req.params;

    const reply = await Reply.findById(id);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    reply.likes += 1;
    await reply.save();

    res.status(200).json(reply);
  } catch (error) {
    res.status(404).json({ error: 'Reply not found', details: error.message });
  }
};

// Middleware function to authenticate user
const authenticateAndHandleReplies = async (req, res, next) => {
  try {
    await authenticateUser(req, res, () => next());
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Export functions for use in other parts of the application
module.exports = {
  createReply,
  updateReply,
  deleteReply,
  likeReply,
  authenticateAndHandleReplies
};
