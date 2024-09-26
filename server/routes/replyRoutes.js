const express = require('express');
const router = express.Router();
const RepliesController = require('../controllers/ReplyController');
const authenticateUser = require('../middlewares/authenticateUser');

router.post('/comments/:comment_id/replies', authenticateUser, RepliesController.createReply);
router.put('/replies/:id', authenticateUser, RepliesController.updateReply);
router.delete('/replies/:id', authenticateUser, RepliesController.deleteReply);
router.post('/replies/:id/like', RepliesController.likeReply);

module.exports = router;
