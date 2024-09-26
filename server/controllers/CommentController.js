const Comment = require('../models/Comment');
const authenticateUser = require('../middlewares/authenticateUser');

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: 'Comments not found' });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, user: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.user.equals(req.user.id)) {
      await comment.update(req.body);
      res.status(200).json(comment);
    } else {
      res.status(403).json({ error: 'Unauthorized action' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.user.equals(req.user.id)) {
      await comment.remove();
      res.status(204).send();
    } else {
      res.status(403).json({ error: 'Unauthorized action' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
};

// Like a comment
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    comment.likes += 1;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: 'Comment not found' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
};
