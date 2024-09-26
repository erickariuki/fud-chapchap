const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const authenticateUser = require('../middlewares/authenticateUser');
const authenticateRider = require('../middlewares/authenticateRiders');
const authenticateRestaurant = require('../middlewares/authenticateRestaurant');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user_id, quantity, price, restaurant_id, order_type } = req.body;
    const order = new Order({
      user_id,
      quantity,
      price,
      restaurant_id,
      order_type,
      status: 'created',
      created_at: new Date(),
    });

    await order.save();

    if (price > 500) {
      const points = Math.floor(price / 500);
      const user = await User.findById(user_id);
      user.yummypoints = (user.yummypoints || 0) + points;
      await user.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
};

// Confirm an order
const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.user_id.equals(req.user.id) && order.status === 'created') {
      const now = new Date();
      const createdAt = new Date(order.created_at);
      const timeDifference = Math.floor((now - createdAt) / 1000 / 60);

      if (timeDifference <= 10) {
        order.status = 'confirmed';
        await order.save();
        res.status(200).json({ message: 'Order confirmed' });
      } else {
        order.status = 'canceled';
        await order.save();
        res.status(422).json({ error: 'Order has expired and was canceled' });
      }
    } else {
      res.status(422).json({ error: 'Unable to confirm order' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.user_id.equals(req.user.id) && ['created', 'confirmed'].includes(order.status)) {
      order.status = 'canceled';
      await order.save();
      res.status(200).json({ message: 'Order canceled' });

      setTimeout(async () => {
        const reloadedOrder = await Order.findById(req.params.id);
        if (reloadedOrder && reloadedOrder.status === 'canceled') {
          await reloadedOrder.remove();
        }
      }, 5 * 60 * 1000); // 5 minutes
    } else {
      res.status(422).json({ error: 'Unable to cancel order' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

// Fetch orders for a restaurant
const fetchOrdersForRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({ restaurant_id: req.params.restaurant_id }).populate('user').populate('orderitems');
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: 'Orders not found' });
  }
};

// Confirm delivery of an order
const confirmDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.order_type === 'delivery' && order.status === 'confirmed') {
      order.status = 'delivering';
      await order.save();
      res.status(200).json({ message: 'Order is now being delivered' });
    } else {
      res.status(422).json({ error: 'Unable to confirm delivery' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

// Fetch delivery orders
const fetchDeliveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({ order_type: 'delivery' }).populate('user').populate('restaurant');
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ error: 'Orders not found' });
  }
};

module.exports = {
  createOrder,
  confirmOrder,
  cancelOrder,
  fetchOrdersForRestaurant,
  confirmDelivery,
  fetchDeliveryOrders
};
