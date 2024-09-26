const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/OrderItemsController');
const authenticateUser = require('../middlewares/authenticateUser');

// Route to create order items (authentication required)
router.post('/order-items', authenticateUser, orderItemsController.authenticateAndCreateOrderItems);

module.exports = router;
