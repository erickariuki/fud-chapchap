// const Booking = require('../models/Booking');
// const Restaurant = require('../models/Restaurant');
// const { currentRestaurant } = require('../middlewares/authenticateUser');

// // Get all bookings for a specific restaurant
// const getAllBookings = async (req, res) => {
//   try {
//     const restaurant = await currentRestaurant(req); // Find the current restaurant
//     if (!restaurant) return res.status(401).json({ error: 'Unauthorized' });

//     const bookings = await Booking.find({ restaurant_id: req.params.restaurantId }).populate('restaurant_id');
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// // Get all bookings for admin users
// const getAdminBookings = async (req, res) => {
//   try {
//     const restaurant = await currentRestaurant(req);
//     if (restaurant && restaurant.admin) {
//       const bookings = await Booking.find().populate('restaurant_id');
//       res.status(200).json(bookings);
//     } else {
//       res.status(403).json({ error: 'Access denied. You are not an admin.' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// // Create a new booking for a specific restaurant
// const createBooking = async (req, res) => {
//   try {
//     const { firstname, lastname, email, guests, date, time, instruction } = req.body;
//     const restaurantId = req.params.restaurantId;

//     const booking = new Booking({
//       firstname,
//       lastname,
//       email,
//       guests,
//       date,
//       time,
//       instruction,
//       restaurant_id: restaurantId,
//     });

//     const savedBooking = await booking.save();
//     res.status(201).json(savedBooking);
//   } catch (err) {
//     res.status(422).json({ error: 'Booking creation failed' });
//   }
// };

// // Update an existing booking
// const updateBooking = async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const updates = req.body;

//     const booking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     res.status(200).json(booking);
//   } catch (err) {
//     res.status(422).json({ error: 'Booking update failed' });
//   }
// };

// // Delete a booking
// const deleteBooking = async (req, res) => {
//   try {
//     const bookingId = req.params.id;

//     const booking = await Booking.findByIdAndDelete(bookingId);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// module.exports = {
//   getAllBookings,
//   getAdminBookings,
//   createBooking,
//   updateBooking,
//   deleteBooking,
// };
