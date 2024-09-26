// blogsController.js
const Blog = require('../models/Blog.js');
const Like = require('../models/Like.js');
const authenticateUser = require('../middlewares/authenticateUser.js');

const index = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('comments.replies');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('comments.replies');
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, user: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(422).json({ error: 'Blog could not be created' });
  }
};

const update = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found or not authorized' });
    }
  } catch (error) {
    res.status(422).json({ error: 'Blog could not be updated' });
  }
};

const destroy = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (blog) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Blog not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const like = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const like = new Like({ blog: blog._id, user: req.user.id });
    await like.save();
    res.status(200).json({ message: 'Blog liked successfully' });
  } catch (error) {
    res.status(422).json({ error: 'Unable to like blog' });
  }
};

const fetch_likes_from_followed = async (req, res) => {
  try {
    const blogs = await Blog.find({
      'likes.user': { $in: req.user.following },
    }).populate('likes');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  like,
  fetch_likes_from_followed,
};
