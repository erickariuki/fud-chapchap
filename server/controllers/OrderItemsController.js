const OrderItem = require('../models/OrderItems');
const authenticateUser = require('../middlewares/authenticateUser');

// Create order items
const createOrderItems = async (req, res) => {
  try {
    const { order_items } = req.body;

    for (const item of order_items) {
      const newItem = new OrderItem(item);
      await newItem.save();
    }

    res.status(201).json({ message: 'Order items created successfully' });
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Middleware function to authenticate user
const authenticateAndCreateOrderItems = async (req, res, next) => {
  try {
    await authenticateUser(req, res, async () => {
      await createOrderItems(req, res);
    });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Export functions to be used in other parts of the application
module.exports = {
  authenticateAndCreateOrderItems,
};
