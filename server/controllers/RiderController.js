const Rider = require('../models/Rider');
const Delivery = require('../models/Rider'); // Ensure this model exists
const { authenticateRider, currentRider, encodeToken } = require('./applicationController');

// Get all riders
const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find({});
    res.status(200).json(riders);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a new rider
const createRider = async (req, res) => {
  try {
    const rider = new Rider(req.body);
    await rider.save();
    const token = encodeToken({ riderId: rider._id });
    res.status(201).json({
      token: token,
      rider: rider.toObject({
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

// Rider login
const loginRider = async (req, res) => {
  try {
    const rider = await Rider.findOne({ email: req.body.email });
    if (rider && (await rider.comparePassword(req.body.password))) {
      const token = encodeToken({ riderId: rider._id });
      res.status(200).json({
        token: token,
        rider: rider.toObject({
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

// Show current rider
const showRider = async (req, res) => {
  const rider = await currentRider(req);
  if (rider) {
    res.json(rider);
  } else {
    res.status(401).json({ error: 'Not authorized' });
  }
};

// Update rider
const updateRider = async (req, res) => {
  try {
    const rider = await currentRider(req);
    if (rider) {
      await rider.updateOne(req.body);
      res.status(200).json(rider);
    } else {
      res.status(404).json({ error: 'Rider not found' });
    }
  } catch (err) {
    res.status(422).json({ error: 'Failed to update rider.' });
  }
};

// Get rider deliveries
const getRiderDeliveries = async (req, res) => {
  try {
    const rider = await currentRider(req);
    const deliveries = await rider.getDeliveries();
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Accept delivery
const acceptDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.body.deliveryId);
    const rider = await currentRider(req);
    if (rider.acceptDelivery(delivery)) {
      res.status(200).json({ message: 'Delivery accepted successfully' });
    } else {
      res.status(422).json({ error: 'Unable to accept delivery' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Complete delivery
const completeDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.body.deliveryId);
    const rider = await currentRider(req);
    if (rider.completeDelivery(delivery)) {
      res.status(200).json({ message: 'Delivery completed successfully' });
    } else {
      res.status(422).json({ error: 'Unable to complete delivery' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllRiders,
  createRider,
  loginRider,
  showRider,
  updateRider,
  getRiderDeliveries,
  acceptDelivery,
  completeDelivery
};
