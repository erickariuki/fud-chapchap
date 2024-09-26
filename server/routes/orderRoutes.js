

const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrderController');
const authenticateUser = require('../middlewares/authenticateUser');
const authenticateRider = require('../middlewares/authenticateRiders');
const authenticateRestaurant = require('../middlewares/authenticateRestaurant');

router.post('/orders', authenticateUser, OrdersController.createOrder);
router.put('/orders/:id/confirm', authenticateUser, OrdersController.confirmOrder);
router.delete('/orders/:id/cancel', authenticateUser, OrdersController.cancelOrder);
router.get('/restaurants/:restaurant_id/orders', authenticateRestaurant, OrdersController.fetchOrdersForRestaurant);
router.put('/orders/:id/deliver', authenticateRider, OrdersController.confirmDelivery);
router.get('/orders/delivery', authenticateRider, OrdersController.fetchDeliveryOrders);

module.exports = router;
