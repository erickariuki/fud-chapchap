const express = require('express');
const router = express.Router();
const BlogsController = require('../controllers/blogController');
const authenticateUser = require('../middlewares/authenticateUser');

// Route to get all blogs
router.get('/blogs', BlogsController.index);
router.get('/blogs/:id', BlogsController.show);
router.post('/blogs', authenticateUser, BlogsController.create);
router.put('/blogs/:id', authenticateUser, BlogsController.update);
router.delete('/blogs/:id', authenticateUser, BlogsController.destroy);
router.post('/blogs/:id/like', authenticateUser, BlogsController.like);
router.get('/blogs/followed-likes', authenticateUser, BlogsController.fetch_likes_from_followed);

module.exports = router;
