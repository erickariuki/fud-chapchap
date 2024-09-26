// // bookingRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   getAllBookings,
//   getAdminBookings,
//   createBooking,
//   updateBooking,
//   deleteBooking,
// } = require('../controllers/bookingController'); // Ensure this path is correct
// const { authenticateUser, authenticateRestaurant, currentRestaurant } = require('../middlewares/authenticateUser'); // Ensure this path is correct

// // Route handlers for bookings
// router.get('/restaurants/:restaurantId/bookings', authenticateRestaurant, getAllBookings); 
// router.get('/admin/bookings', authenticateUser, getAdminBookings);
// router.post('/restaurants/:restaurantId/bookings', authenticateUser, createBooking);
// router.put('/bookings/:id', authenticateUser, updateBooking);
// router.delete('/bookings/:id', authenticateUser, deleteBooking);

// module.exports = router;
