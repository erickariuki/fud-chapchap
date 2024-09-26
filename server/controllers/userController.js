const User = require('../models/User');
const { authenticateUser, currentUser, encodeToken } = require('./applicationcontroller');

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.comparePassword(password)) {
      const token = encodeToken({ userId: user._id });
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

// User signup
const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = encodeToken({ userId: user._id });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

// Get current user's profile
const getProfile = async (req, res) => {
  try {
    const user = await currentUser(req);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// Update current user's profile
const updateProfile = async (req, res) => {
  try {
    const user = await currentUser(req);
    if (user) {
      await User.updateOne({ _id: user._id }, req.body);
      res.status(200).json({ message: 'Profile updated successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(422).json({ error: 'Failed to update profile' });
  }
};

// Delete current user's account
const deleteAccount = async (req, res) => {
  try {
    const user = await currentUser(req);
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// Get all users (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const user = await currentUser(req);
    if (user) {
      const orders = await user.getOrders();  // Assumes getOrders is a method defined on the User model
      res.status(200).json(orders);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user orders' });
  }
};

// Follow another user
const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const user = await currentUser(req);
    if (user && userToFollow) {
      if (!user.following.includes(userToFollow._id)) {
        user.following.push(userToFollow._id);
        await user.save();
        res.status(200).json({ message: 'User followed successfully' });
      } else {
        res.status(400).json({ error: 'Already following this user' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error following user' });
  }
};

// Unfollow another user
const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const user = await currentUser(req);
    if (user && userToUnfollow) {
      user.following = user.following.filter(id => id.toString() !== userToUnfollow._id.toString());
      await user.save();
      res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};

// Get blogs of users followed by current user
const getUserBlogs = async (req, res) => {
  try {
    const user = await currentUser(req);
    if (user) {
      const blogs = await Blog.find({ userId: { $in: user.following } });
      res.status(200).json(blogs);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

// Tag a user in a post
const tagUserInPost = async (req, res) => {
  try {
    const taggedUser = await User.findById(req.body.taggedUserId);
    const post = await Post.findById(req.body.postId);
    if (post && taggedUser) {
      post.tags.push(taggedUser._id);
      await post.save();
      res.status(200).json({ message: 'User tagged successfully' });
    } else {
      res.status(404).json({ error: 'Post or User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error tagging user' });
  }
};

module.exports = {
  login,
  signup,
  getProfile,
  updateProfile,
  deleteAccount,
  getUsers,
  getUserOrders,
  followUser,
  unfollowUser,
  getUserBlogs,
  tagUserInPost
};
