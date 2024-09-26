// controllers/yummypointController.js

const Yummypoint = require('../models/Yummypoint');
const User = require('../models/User');

// Create a Yummypoint
const createYummypoint = async (req, res) => {
  try {
    const yummypoint = new Yummypoint(req.body);
    await yummypoint.save();
    res.status(201).json(yummypoint);
  } catch (error) {
    res.status(422).json({ error: 'Yummypoint could not be created' });
  }
};

// Get a Yummypoint by user ID
const getYummypoint = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const yummypoint = await Yummypoint.findOne({ user: user._id })
      .populate('foods.cuisine')
      .populate('foods')
      .populate('orders.orderItems.food')
      .populate('orders.user');

    if (yummypoint) {
      res.status(200).json(yummypoint);
    } else {
      res.status(404).json({ error: 'Yummypoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Yummypoint by ID
const deleteYummypoint = async (req, res) => {
  try {
    const yummypoint = await Yummypoint.findByIdAndDelete(req.params.id);
    if (yummypoint) {
      res.status(200).json({ message: 'Yummypoint deleted successfully' });
    } else {
      res.status(404).json({ error: 'Yummypoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Yummypoint could not be deleted' });
  }
};

module.exports = {
  createYummypoint,
  getYummypoint,
  deleteYummypoint,
};
