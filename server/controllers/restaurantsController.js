const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food'); // Fixed reference
const { authenticateRestaurant, currentRestaurant, encodeToken } = require('./applicationcontroller');

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    const token = encodeToken({ restaurantId: restaurant._id });
    res.status(201).json({
      token: token,
      restaurant: restaurant.toObject({
        versionKey: false,
        transform: (doc, ret) => {
          delete ret.password;
          return ret;
        }
      })
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

// Restaurant login
const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const restaurant = await Restaurant.findOne({ email });

    if (restaurant && (await restaurant.comparePassword(password))) {
      const token = encodeToken({ restaurantId: restaurant._id });
      res.status(200).json({
        token: token,
        restaurant: restaurant.toObject({
          versionKey: false,
          transform: (doc, ret) => {
            delete ret.password;
            return ret;
          }
        })
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Show current restaurant
const showCurrentRestaurant = async (req, res) => {
  try {
    const restaurant = await currentRestaurant(req);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(401).json({ error: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update restaurant details
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await currentRestaurant(req);
    if (restaurant) {
      await restaurant.updateOne(req.body);
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(422).json({ error: 'Failed to update restaurant.' });
  }
};

// Get foods offered by the restaurant
const getFoods = async (req, res) => {
  try {
    const restaurant = await currentRestaurant(req);
    const foods = await Food.find({ restaurant_id: restaurant._id });
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new food
const createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    const restaurant = await currentRestaurant(req);
    food.restaurant_id = restaurant._id;
    await food.save();
    res.status(201).json({ message: "Food created successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a food
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    const restaurant = await currentRestaurant(req);
    if (food && food.restaurant_id.equals(restaurant._id)) {
      await food.remove();
      res.status(200).json({ message: "Food deleted successfully" });
    } else {
      res.status(422).json({ error: "Unable to delete food" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Export functions for use in other parts of the application
module.exports = {
  getAllRestaurants,
  createRestaurant,
  loginRestaurant,
  showCurrentRestaurant,
  updateRestaurant,
  getFoods,
  createFood,
  deleteFood,
};
