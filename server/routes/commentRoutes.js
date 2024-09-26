const express = require('express');
const router = express.Router();
const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment
} = require('../controllers/commentController');
const authenticateUser = require('../middlewares/authenticateUser');

// Get all comments
router.get('/', getAllComments);

// Create a new comment (requires user authentication)
router.post('/', authenticateUser, createComment);

// Update a comment (requires user authentication)
router.put('/:id', authenticateUser, updateComment);

// Delete a comment (requires user authentication)
router.delete('/:id', authenticateUser, deleteComment);

// Like a comment (no authentication needed for liking a comment)
router.post('/:id/like', likeComment);

module.exports = router;
